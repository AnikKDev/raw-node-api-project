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
    console.log("error parsing json");
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
// creating a function for generating random string
utilities.randomString = (strLength) => {
  let string = "";
  let possibleString =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i <= strLength; i++) {
    // ekhane charAt diye amra jeta korte pari, jodi charAt er vetor 7 likhi, tahole se string er 7 nummber item ta amake output hishebe dibe. taai amra random ekta number disi oikhane jeta amader length er range er moddhei hobe.
    string += possibleString.charAt(
      Math.floor(Math.random() * possibleString.length)
    );
  }
  console.log(string);

  return string;
};
// exporting the object
module.exports = utilities;
