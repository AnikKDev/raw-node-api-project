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
handler._token.post = (requestedProperties, callback) => {};
// this will handle getting users
handler._token.get = (requestedProperties, callback) => {};
// this will handle updating users
handler._token.put = (requestedProperties, callback) => {};
// this will handle deleting users
handler._token.delete = (requestedProperties, callback) => {};
module.exports = handler;