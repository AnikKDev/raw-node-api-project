const validators = {};

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
module.exports = validators;
