// dependencies
const { hashString, parseJson } = require("../../helpers/utils");
const { read, create, update, delete: deleteUser } = require("../../lib/data");
const {
  checkEmail,
  checkFirstName,
  checkLastName,
  checkPassword,
  checkPhoneNumber,
} = require("../../helpers/validators");
const { _token } = require("./tokenHandler");
const validators = require("../../helpers/validators");
const handler = {};
// etai hocche choosenhandler er function ta. jetar requested properties ar callback ta amra return kortesi. jeta pore req.end() er oikhane giye shesh kortesi.
handler.userHandler = (requestedProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete", "patch"];
  if (!acceptedMethods.includes(requestedProperties.method)) {
    return callback(405, { message: "method not allowed" });
  }
  //   we are passing the propery dynacmically here. if the method is get it will run the get method from the handler._users handler, and the post method will run the post method from the handler._users handler, and the put method will run the put method from the handler._users handler, and the delete method will run the delete method from the handler._users handler [this is simply a method to get dynamic properties from an object]
  handler._users[requestedProperties.method](requestedProperties, callback);
};

// extra layer scaffolding for users
handler._users = {};
// this will handle posting/adding users
handler._users.post = (requestedProperties, callback) => {
  // validating the request
  if (!requestedProperties.body) {
    return callback(400, { message: "missing body" });
  }
  // validating the body
  if (
    !requestedProperties.body.firstName ||
    !requestedProperties.body.lastName
  ) {
    return callback(400, { message: "missing firstName or lastName" });
  }
  if (
    requestedProperties.body.firstName.trim().length <= 0 ||
    requestedProperties.body.lastName.trim().length <= 0
  ) {
    return callback(400, { message: "field length is less than 0" });
  }
  if (requestedProperties.body.phone.trim().length !== 11) {
    return callback(400, { message: "invalid phone number" });
  }
  if (requestedProperties.body.password.trim().length <= 6) {
    return callback(400, { message: "password length is less than 6" });
  }
  if (typeof requestedProperties.body.tosAgreement !== "boolean") {
    console.log(typeof requestedProperties.body.tosAgreement);
    return callback(400, { message: "invalid tosAgreement" });
  }
  if (
    !requestedProperties.body.firstName &&
    !requestedProperties.body.lastName &&
    !requestedProperties.body.password &&
    !requestedProperties.body.tosAgreement &&
    !requestedProperties.body.phone
  ) {
    return callback(400, { message: "one or more properties are missing" });
  } else {
    // make sure that the user does not already exist in the db
    read("users", requestedProperties.body.phone, (err, user) => {
      if (err) {
        // ekhane error howa maane, ei naame file naai. read korte partesena. tahole amra user er file create korbo.
        let userInfo = {
          firstName: requestedProperties.body.firstName,
          lastName: requestedProperties.body.lastName,
          phone: requestedProperties.body.phone,
          password: hashString(requestedProperties.body.password),
          tosAgreement: requestedProperties.body.tosAgreement,
        };
        // storing the user into the database
        create("users", requestedProperties.body.phone, userInfo, (err) => {
          if (err)
            return callback(200, { message: "successfully created the user" });
        });
      } else {
        // jodi file read korte pare, taar maane, file already ase. taai amra ar user create korbona.
        return callback(400, { message: "user already exists" });
      }
    });
  }
  // callback(405);
};
// this will handle getting users
handler._users.get = (requestedProperties, callback) => {
  try {
    // authentication
    // first validate phone
    if (requestedProperties.queryStringObject.phone.trim().length !== 11) {
      return callback(400, { message: "invalid phone number" });
    }
    const phone = validators.checkPhoneNumber(
      requestedProperties.queryStringObject.phone,
      callback
    );
    const token =
      typeof requestedProperties.headersObject.token === "string"
        ? requestedProperties.headersObject.token
        : false;
    if (!token) {
      return callback(400, { message: "Token invalid" });
    }
    // varification of token
    _token.verifyToken(token, phone, (tokenId) => {
      if (!tokenId) {
        return callback(400, { message: "token false" });
      }
      read(
        "users",
        requestedProperties.queryStringObject.phone.trim(),
        (err, user) => {
          // check the erro first --> erorback pattern
          if (err) {
            return callback(404, { message: "user does not exist" });
          }
          // we have to remove the password. we don't want to show the password
          // but deleting something in the parameter, is not a good practice.
          //! delete user.password; --> don't do this. Instead,
          const userParsedData = { ...parseJson(user) };
          // we have parsed the json data to an object and after that we have used spread operator to copy the things immutably
          // now we can remove the password
          delete userParsedData.password;
          callback(200, userParsedData);
        }
      );
    });
  } catch (err) {
    callback(404, { message: "Something went wrong" });
  }
};
// this will handle updating users
handler._users.put = (requestedProperties, callback) => {
  // check validations
  const phone = checkPhoneNumber(requestedProperties.body.phone, callback);
  const firstName = checkFirstName(
    requestedProperties.body.firstName,
    callback
  );
  const lastName = checkLastName(requestedProperties.body.lastName, callback);
  const password = checkPassword(
    hashString(requestedProperties.body.password),
    callback
  );
  const token =
    typeof requestedProperties.headersObject.token === "string"
      ? requestedProperties.headersObject.token
      : false;
  if (!token) {
    return callback(400, { message: "Token invalid" });
  }

  _token.verifyToken(token, phone, (tokenId) => {
    if (!tokenId) {
      return callback(400, { message: "token false" });
    }
    // check if the phone is here because we are assuming phone is a must and it is the id
    if (phone) {
      if (firstName || lastName || password) {
        read("users", phone, (err, userData) => {
          // jokhoni file syestem theke data ashbe, we should parse it first before using it...
          const updatedUser = { ...parseJson(userData) };
          if (err) {
            return callback(404, { message: "user does not exist" });
          }
          if (firstName) {
            updatedUser.firstName = firstName;
          }
          if (lastName) {
            updatedUser.lastName = lastName;
          }
          if (password) {
            updatedUser.password = password;
          }

          // update the user
          update("users", phone, updatedUser, (err) => {
            if (err) {
              return callback(404, {
                message: "Couldn't update the user data",
              });
            }
            return callback(200, { message: "successfully updated the user" });
          });
        });
      }
    }
  });
};
// this will handle deleting users
handler._users.delete = (requestedProperties, callback) => {
  // check the phone number first and lookup the user
  const phone = checkPhoneNumber(
    requestedProperties.queryStringObject.phone,
    callback
  );
  if (phone) {
    read("users", phone, (err, user) => {
      if (err) {
        return callback(404, { message: "user does not exist" });
      }
      deleteUser("users", phone, (err) => {
        if (err) {
          return callback(404, { message: "user couldn't delete" });
        }
        callback(200, { message: "user deleted successfully" });
      });
      // callback(200, user);
    });
  }
};
module.exports = handler;
