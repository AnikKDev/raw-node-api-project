const validators = {};
validators.urlValidator = {};
validators.checkFirstName = (firstName, callback) => {
  if (!firstName || firstName.trim().length <= 0)
    return callback(400, { message: "Please enter first name" });
  return firstName;
};

// check last name
validators.checkLastName = (lastName, callback) => {
  if (!lastName || lastName.trim().length <= 0)
    return callback(400, { message: "Please enter last name" });
  return lastName;
};

// check email
validators.checkEmail = (email, callback) => {
  if (!email || email.trim().length <= 0)
    return callback(400, { message: "Please enter email" });
  return email;
};

// check phone number
validators.checkPhoneNumber = (phoneNumber, callback) => {
  if (!phoneNumber || phoneNumber.trim().length <= 0)
    return callback(400, { message: "Please enter phone number" });
  return phoneNumber;
};

// check password
validators.checkPassword = (password, callback) => {
  if (!password || password.trim().length <= 0)
    return callback(400, { message: "Please enter password" });
  return password;
};

// validate token
validators.checkToken = (token, callback) => {
  if (!token || token.trim().length <= 0)
    return callback(400, { message: "Please enter token" });
  return token;
};

// extend token
validators.checkExtendedToken = (token, callback) => {
  if (!token || typeof token !== "boolean")
    return callback(400, { message: "Please enter valid token" });
  return token;
};

// url validations
validators.urlValidator.checkProtocol = (urlProtocol, callback) => {
  if (!urlProtocol)
    return callback(400, { message: "Please enter a valid protocol" });
  if (["http", "https"].indexOf(urlProtocol) < 0)
    return callback(400, {
      message: "please enter a valid http or https protocol",
    });
  return urlProtocol;
};
// check url
validators.urlValidator.checkUrl = (url, callback) => {
  if (!url) return callback(400, { message: "please enter a url" });
  if (typeof url !== "string")
    return callback(400, { message: "please enter a string type" });
  return url;
};
// check method
validators.urlValidator.checkMethod = (method, callback) => {
  if (!method) return callback(400, { message: "please enter a method" });
  if (["get", "post", "put", "delete"].indexOf(method) < 0)
    return callback(400, {
      message: "your entered method is not 'get' 'post' 'put' or 'delete'",
    });
  return method;
};
// check success code
validators.urlValidator.checkStatusCode = (code, callback) => {
  if (!code) return callback(400, { message: "please enter a http code" });
  if (typeof code !== "object" && code instanceof !Array)
    return callback(400, { message: "your code must be an array" });
  return code;
};

// check timeout seconds
validators.urlValidator.checkTimeout = (timeout, callback) => {
  if (!timeout) return callback(400, { message: "Please enter a timeout" });
  if (typeof timeout !== "number")
    return callback(400, { message: "please enter a number" });
  if (timeout % 1 !== 0)
    return callback(400, {
      message:
        "your entered timeout is not a whole number. please enter a whole number",
    });
  if (timeout < 1 || timeout > 5)
    return callback(400, { message: "pleae enter timeout between 1 to 5" });
  return timeout;
};

module.exports = validators;
