// ! routes

// dependencies
const { sampleHandler } = require("../handlers/routesHandler/handler");
const { userHandler } = require("../handlers/routesHandler/userHandler");
const routes = {
  // nicher gulo hocche function jegulo choosen handler er moddhe use kortesi. ar ei function gulor duita kore parameters ache. ekta hocche properties ar arekta hocche callback function.
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;
