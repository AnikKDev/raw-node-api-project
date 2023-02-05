// dependencies
const { hashString } = require("../../helpers/utils");
const { read, create } = require("../../lib/data");

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
  callback(200, { message: "successfully getting the user" });
};
// this will handle updating users
handler._users.put = (requestedProperties, callback) => {};
// this will handle deleting users
handler._users.delete = (requestedProperties, callback) => {};
module.exports = handler;
