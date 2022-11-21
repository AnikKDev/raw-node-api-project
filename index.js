/* 
    * title: Uptime monitoring application
    * description: a restful to monitor up or down time of user defined links
    * author: Anik kanti Dev
    * date: 18/11/2022
*/
// dependecies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
// app object -- module scaffolding
const app = {};

// configuration
app.config = {
    port: 5000,
};
console.log(environment)
// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to ${process.env.NODE_ENV}`)
        console.log(`listening to port ${environment.port}`);
    });
};

// handle request and response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();