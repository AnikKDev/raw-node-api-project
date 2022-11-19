// ! handle request and response

// =================================
// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
// scafolding
const handler = {};


handler.handleReqRes = (req, res) => {
    // ? request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    // remove unwanted slashes and spaces from the pathname e.g: /about/ /about etc.
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData)
        // response handle
        res.end('hello world');
    })
};

module.exports = handler;