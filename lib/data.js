// dependecies
const fs = require('fs');
const path = require('path');

// scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = function (dir, file, data, callback) {
    // open file for writting
    fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, function (err2) {
                if (!err2) {
                    fs.close(fileDescriptor, function (err3) {
                        if (!err3) {
                            callback(`Error is ${false}`)
                        } else {
                            callback('error closing the new file')
                        }
                    });
                } else {
                    callback('Error writting to new file!')
                }
            });
        } else {
            callback('could not create new file, it may already exists!')
        }
    })
};

// read data form file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir + dir + '/' + file + '.json', 'utf-8', (err, data) => {
        callback(err, data);
    })
}

module.exports = lib;