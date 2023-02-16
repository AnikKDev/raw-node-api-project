// ! routes

// dependencies
const { sampleHandler } = require("../handlers/routesHandler/handler");
const { tokenHandler } = require("../handlers/routesHandler/tokenHandler");
const { userHandler } = require("../handlers/routesHandler/userHandler");
const { checkHandler } = require("../handlers/routesHandler/checkHandler");
const routes = {
  // nicher gulo hocche function jegulo choosen handler er moddhe use kortesi. ar ei function gulor duita kore parameters ache. ekta hocche properties ar arekta hocche callback function.
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};

module.exports = routes;
