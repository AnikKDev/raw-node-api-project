// dependecies
const fs = require("fs");
const path = require("path");

// scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writting
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        // write data to file and then close it
        fs.writeFile(fileDescriptor, stringData, function (err2) {
          if (!err2) {
            fs.close(fileDescriptor, function (err3) {
              if (!err3) {
                // console.log(err3);
                callback(`Closed the fs`);
              } else {
                callback("error closing the new file");
              }
            });
          } else {
            callback("Error writting to new file!");
          }
        });
      } else {
        callback("could not create new file, it may already exists!");
      }
    }
  );
};

// read data form file
lib.read = (dir, file, callback) => {
  fs.readFile(
    lib.basedir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      callback(err, data);
    }
  );
};
// udpate existing file
lib.update = (dir, file, data, callback) => {
  // open the file
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert data to string
      const stringData = JSON.stringify(data);

      // truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (err) return callback("Error truncating the file");
        // write the file if there is no error happening
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (err) return callback("Error writing the file");
          // close the file
          fs.close(fileDescriptor, (err) => {
            if (err) return callback("Error closing the file");
            callback(false);
          });
        });
      });
    } else {
      callback("error updating the file, or it may already exists!");
    }
  });
};

// delete file
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (err) return callback("error deleting/unlinking the file");
    callback(false);
  });
};

module.exports = lib;
