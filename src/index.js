const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Start the server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});