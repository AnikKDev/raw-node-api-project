// ! handle request and response

// =================================
// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { notFoundHandler } = require('../handlers/routesHandler/handler');
const routes = require('../routes/routes');
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

    // shob requested property jegulo lagte pare shobguloke ekta single object er moddhe nicchi.
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }

    const decoder = new StringDecoder('utf8');
    let realData = '';

    // check if the path contains any coresponding handler else load notfound handler
    // ekhane chosenhandler ekta function er moto behave korbe karon, eta routes theke jeta return kortese, sheta ekta function
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;


    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
            payload = typeof (payload) === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);

            // return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        })
        // response handle
        res.end('hello world');
    })
};

module.exports = handler;