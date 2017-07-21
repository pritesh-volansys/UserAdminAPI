const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../../config');
const userService = require('../services/user.service');
const Code = require('../commons/exception/StatusCode');

module.exports = {
	registerUser: function (req, res) {
		//TODO parse Request and create User
		var user = {
			name: req.body.name,
			password: req.body.password
		};	
			
		var resData =  userService.registerUser(user);
		res.json("resData : ", resData);

		
		
		// .then(function (data) {
		// 	res.json(data);
		// }).catch(function (err) {			
		// 	res.json(err);			
		// });
	},

	authUser: function (req, res) {
		var user = {
			name: req.body.name,
			password: req.body.password
		};
		userService.isValidUser(user).then(function () {
			//TODO use code from static initialization
			//Return sucess error code
			res.send(201);
		}).catch(function (err) {

		});
	},

	checkToken: function (req, res, next) {
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
		if (token) {
			decodedToken = userService.isValidToken(token);
			if (!decodedToken === null) {
				req.decoded = decoded;
				next();
			} else {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			}
		} else {
			return res.status(403).send({
				success: config.fail,
				message: 'token not found, please provide proper token.'
			});
		}
	},

	getUsers: function (req, res) {
		userService.getUserList(req, res).then(function (users) {
			res.json(users);
		}).catch(function (err) {
			return res.json(err);
		});
	}

};