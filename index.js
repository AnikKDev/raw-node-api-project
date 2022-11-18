/* 
    * title: Uptime monitoring application
    * description: a restful to monitor up or down time of user defined links
    * author: Anik kanti Dev
    * date: 18/11/2022
*/
// dependecies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// app object -- module scaffolding
const app = {};

// configuration
app.config = {
    port: 8000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle request and response
app.handleReqRes = (req, res) => {
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

// start the server
app.createServer();