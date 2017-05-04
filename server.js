// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const Word = require('./api/models/wordsModel');
const bodyParser = require('body-parser');
const CONFIG = require('./api/config');

const app = express();
// Prepare mongodb connexion
mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api', api);
var routes = require('./api/routes/wordsRoutes');
routes(app);

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'dist/index.html'));
// });


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));