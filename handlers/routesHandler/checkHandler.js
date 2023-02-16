// dependencies
const { hashString, parseJson } = require("../../helpers/utils");
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
} = require("../../helpers/validators");
const { _token } = require("./tokenHandler");
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
    console.log(url, method, statusCode, timeoutSeconds, protocol);

    console.log(200, { message: "validation is success" });
  }
};
// this will handle getting users
handler._check.get = (requestedProperties, callback) => {};
// this will handle updating users
handler._check.put = (requestedProperties, callback) => {};
// this will handle deleting users
handler._check.delete = (requestedProperties, callback) => {};

module.exports = handler;
