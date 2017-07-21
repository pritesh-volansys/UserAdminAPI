// get the packages we need 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const initDB = require('./app/dao/database');
const apiRoutes = require('./app/routes/router');
const userCtrl = require('./app/controllers/user.controller');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // get our config file
let errHandler = require('./app/commons/errorHandler'); // Error handler

const connection = initDB.connection();

// configuration
const port = process.env.PORT || config.port; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// regiter user 
app.post('/register', function (req, res) {
  userCtrl.registerUser(req, res);
});

// basic route (http://localhost:8082)
app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.use(function (err, req, res, next) {
  errHandler.exceptionHandler(err, req, res, next);  
});

app.use('/api', apiRoutes);
app.listen(port);
