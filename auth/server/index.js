// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// App Setup

// Register Express server 
// `morgan` -> for logging requests (mainly used for debugging)
app.use(morgan('combined'));

// `body-parser` -> parse incoming requests to json
app.use(bodyParser.json({ type: '*/*' }));


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);