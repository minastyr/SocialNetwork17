// This file sets up the main application routes and can include any additional routes if necessary.

const apiRoutes = require('./api');

const routes = (app) => {
    apiRoutes(app);
};

module.exports = routes;