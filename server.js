const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const dotenv = require('dotenv');  // Changed from import to require
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Log MongoDB connection status
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB at', mongoose.connection.host);

});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

// Routes
app.use('/', require('./src/routes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});