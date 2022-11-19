// ! sample handler

// scaffolding
const handler = {};

handler.sampleHandler = (requestPropeties, callback) => {
    console.log(requestPropeties);
    callback(200, {
        message: 'This is a sample url'
    })
};

handler.notFoundHandler = (requestPropeties, callback) => {
    callback(404, {
        message: 'Not found'
    })
};

module.exports = handler;