const config = require('../../config');
const userDao = require('../dao/userDao');
const userDoesntExistEx = require('../commons/exception/UserDoesntExistException');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const Code = require('../commons/exception/StatusCode');
const unhandleError = require('../commons/exception/UnhandleError');
const passDoesNotMatch = require('../commons/exception/PassDoesNotMatch');

module.exports = {
	registerUser: function (user) {
		new Promise(function (resolve, reject) {
			userDao.getUser(user.name).then(function (existUser) {
				console.log(existUser);
				if (existUser) {
					reject(userDoesntExistEx.toJson());
					return;
				}
				userDao.registerUser(user).then(function (obj) {
					resolve(Code(1, obj));
				}).catch(function (err) {
					reject(Code(0));					
				});
			}).catch(function (err) {
				reject(unhandleError.toJson());
			})
		})
	},

	isValidToken: function (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function (err, decoded) {
			if (err) {
				return null;
			} else {
				return decoded;
			}
		});
	},

	isValidUser: function (user) {
		new Promise(function (resolve, reject) {
			userDao.getUser(user.name).then(function (validUser) {
				if (validUser) {
					if (user.password != validUser.password) {
						reject(passDoesNotMatch.toJson());
					}
					// if user is found and password is right
					// create a token
					var token = jwt.sign(user, config.secret, {
						expiresIn: 86400 // expires in 24 hours
					});
					resolve(token)
				} else {
					reject(userDoesntExistEx.toJson());
				}
			}).catch(function (err) {
				reject(unhandleError.toJson());	
			})
		})
	},

	getUserList: function (req, res) {
		new Promise(function (resolve, reject) {
			userDao.getAllUser().then(function (users) {
				resolve(Code(1,users));				
			}).catch(function (err) {
				reject(unhandleError.toJson());
			})
		}).catch(function (err) {
			reject(unhandleError.toJson());
		})
	}

};



