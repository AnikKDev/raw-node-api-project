// dependencies
const { hashString, parseJson, randomString } = require("../../helpers/utils");
const { read, create, update, delete: deleteUser } = require("../../lib/data");
const {
  checkEmail,
  checkFirstName,
  checkLastName,
  checkPassword,
  checkPhoneNumber,
  checkSuccessCode,
  checkMethod,
  checkProtocol,
  urlValidator,
  checkToken,
} = require("../../helpers/validators");
const { _token, tokenHandler } = require("./tokenHandler");
const validators = require("../../helpers/validators");
const handler = {};
// etai hocche choosenhandler er function ta. jetar requested properties ar callback ta amra return kortesi. jeta pore req.end() er oikhane giye shesh kortesi.
handler.checkHandler = (requestedProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete", "patch"];
  if (!acceptedMethods.includes(requestedProperties.method)) {
    return callback(405, { message: "method not allowed" });
  }
  //   we are passing the propery dynacmically here. if the method is get it will run the get method from the handler._check handler, and the post method will run the post method from the handler._check handler, and the put method will run the put method from the handler._check handler, and the delete method will run the delete method from the handler._check handler [this is simply a method to get dynamic properties from an object]
  handler._check[requestedProperties.method](requestedProperties, callback);
};

// extra layer scaffolding for users
handler._check = {};
// this will handle posting/adding users
handler._check.post = (requestedProperties, callback) => {
  // checking validations
  const protocol = urlValidator.checkProtocol(
    requestedProperties.body.protocol,
    callback
  );
  const url = urlValidator.checkUrl(requestedProperties.body.url, callback);
  const method = urlValidator.checkMethod(
    requestedProperties.body.method,
    callback
  );
  const statusCode = urlValidator.checkStatusCode(
    requestedProperties.body.statusCode,
    callback
  );
  const timeoutSeconds = urlValidator.checkTimeout(
    requestedProperties.body.timeoutSeconds,
    callback
  );

  if (!url || !method || !statusCode || !timeoutSeconds || !protocol) {
    console.log(url, method, statusCode, timeoutSeconds, protocol);
    console.log(200, { message: "validation is failure" });
  } else {
    const token = checkToken(requestedProperties.headersObject.token, callback);
    // lookup the user phone by reading the token
    read("tokens", token, (err, tokenData) => {
      if (err) return callback(403, { message: "error getting token data" });
      const phone = parseJson(tokenData).phone;
      // now get user data by using this phone from users directory
      read("users", phone, (err, userData) => {
        if (err) return callback(403, { message: "error reading user data" });
        _token.verifyToken(token, phone, (isTokenValid) => {
          if (!isTokenValid)
            return callback(404, { message: "token is invalid" });
          const userObject = parseJson(userData);
          const userChecks =
            typeof userObject.checks === "object" &&
            userObject.checks instanceof Array
              ? userObject.checks
              : [];
          if (userChecks.length > 5)
            return callback(404, { message: "user already reached max check" });
          let checkId = randomString(20);
          let checkObject = {
            id: checkId,
            phone,
            protocol,
            url,
            method,
            statusCode,
            timeoutSeconds,
          };
          // save the object
          create("checks", checkId, checkObject, (err) => {
            // if (err) return callback(500, { message: "error creating check" });
            // if not error, add checkid to user object first
            userObject.checks = userChecks;
            userObject.checks.push(checkId);
            // update the user data with checks in it
            update("users", phone, userObject, (err) => {
              if (err)
                return callback(400, {
                  message: "error updating user data with checks in it",
                });
              // return the data with new checks
              callback(200, checkObject);
            });
          });
        });
      });
    });
  }
};
// this will handle getting users
handler._check.get = (requestedProperties, callback) => {};
// this will handle updating users
handler._check.put = (requestedProperties, callback) => {};
// this will handle deleting users
handler._check.delete = (requestedProperties, callback) => {};

module.exports = handler;
