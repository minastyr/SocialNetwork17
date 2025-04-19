const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

const apiRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/thoughts', thoughtRoutes);
};

module.exports = apiRoutes;