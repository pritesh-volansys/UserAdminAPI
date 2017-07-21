const express = require('express');
const userCtrl = require('../controllers/user.controller');


// get an instance of the router for api routes
const apiRoutes = express.Router();

// http://localhost:8082/api/authenticate
apiRoutes.post('/authenticate', function (req, res) {
	userCtrl.authUser(req, res);
});

// route middleware to authenticate and check token
apiRoutes.use(function (req, res, next) {
	userCtrl.checkToken(req, res, next);
});


// authenticated routes
apiRoutes.get('/', function (req, res) {
	res.json({ message: 'Welcome to the my node first API !' });
});

// authenticated user get list
apiRoutes.get('/users', function (req, res) {
	userCtrl.getUsers(req, res);	
});

// authenticated check status
apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

module.exports = apiRoutes;