/*
 * title: Uptime monitoring application
 * description: a restful to monitor up or down time of user defined links
 * author: Anik kanti Dev
 * date: 18/11/2022
 */
// dependecies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");

// app object -- module scaffolding
const app = {};

// !testing file system
// ? pore muche dibo
/* data.create('test', 'newFile2', { 'name': 'Bangladesh', 'language': 'Bengali' }, err => {
    console.log(err);
}); */
/* data.read('test', 'newFile2', (err, data) => {
    console.log(err, data);
}); */
/* data.update(
  "test",
  "newFile2",
  { country: "England", language: "english" },
  //   this err function is the callback function that I am calling in index.js
  (err) => {
    console.log(err);
  }
); */

// deleting file
data.delete("test", "newFile2", (err) => {
  console.log(err);
});

// configuration
app.config = {
  port: 5000,
};
// console.log(environment)
// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    // console.log(`listening to ${process.env.NODE_ENV}`)
    console.log(`listening to port ${environment.port}`);
  });
};

// handle request and response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
