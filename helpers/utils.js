// Description
// Important utilities function that handles the errors or other things
const crypto = require("crypto");
const utilities = {};

// parse json to object properties
utilities.parseJson = (jsonString) => {
  let output = {};
  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
    console.log(error);
  }
  //   return object properties
  return output;
};

// hashing string
utilities.hashString = (string) => {
  let hash = "";
  if (string.length === 0) return hash;
  return (hash = crypto
    .createHmac("sha256", "secret")
    .update(string)
    .digest("hex"));
};
// exporting the object
module.exports = utilities;
