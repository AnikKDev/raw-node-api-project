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
  callback(405);
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
