// dependencies
const { hashString, parseJson, randomString } = require("../../helpers/utils");
const { read, create, update, delete: deleteUser } = require("../../lib/data");
const {
  checkEmail,
  checkFirstName,
  checkLastName,
  checkPassword,
  checkPhoneNumber,
} = require("../../helpers/validators");
const handler = {};
// etai hocche choosenhandler er function ta. jetar requested properties ar callback ta amra return kortesi. jeta pore req.end() er oikhane giye shesh kortesi.
handler.tokenHandler = (requestedProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete", "patch"];
  if (!acceptedMethods.includes(requestedProperties.method)) {
    return callback(405, { message: "method not allowed" });
  }
  //   we are passing the propery dynacmically here. if the method is get it will run the get method from the handler._token handler, and the post method will run the post method from the handler._token handler, and the put method will run the put method from the handler._token handler, and the delete method will run the delete method from the handler._token handler [this is simply a method to get dynamic properties from an object]
  handler._token[requestedProperties.method](requestedProperties, callback);
};

// extra layer scaffolding for users
handler._token = {};
// this will handle posting/adding tokens
handler._token.post = (requestedProperties, callback) => {
  // getting phone and password and validating
  const phone = checkPhoneNumber(requestedProperties.body.phone, callback);
  const password = checkPassword(requestedProperties.body.password, callback);
  if (!password || !phone) {
    return callback(400, { message: "invalid phone or password" });
  }
  //   checking in users database if the user exists or not.
  read("users", phone, (err, userData) => {
    // console.log(userData);
    if (err) {
      return callback(500, { message: "something wrong getting user data" });
    }
    let hashedPassword = hashString(password);
    let parsedUserData = parseJson(userData);
    if (hashedPassword === parsedUserData.password) {
      let tokenId = randomString(20);
      let expires = Date.now() + 60 * 60 * 1000;
      let tokenObject = { phone, tokenId, expires };

      //   creating a file with the token object and storing it in the token database (file)
      create("tokens", tokenId, tokenObject, (err) => {
        if (err) {
          //   console.log(err);
          return callback(500, { message: "something wrong creating token" });
        }
        return callback(200, { token: tokenObject });
      });
    } else {
      return callback(400, { message: "Password could not be generated" });
    }
  });
};
// this will handle getting users
handler._token.get = (requestedProperties, callback) => {};
// this will handle updating users
handler._token.put = (requestedProperties, callback) => {};
// this will handle deleting users
handler._token.delete = (requestedProperties, callback) => {};
module.exports = handler;
