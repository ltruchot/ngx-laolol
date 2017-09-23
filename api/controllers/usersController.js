const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/usersModel');
const config = require('./../config');

function generateToken (user) {
	return jwt.sign(user, config.secretJWT, {
		expiresIn: '7d'
	});
}

// Set user info from request
function setUserInfo (request) {
	return {
		_id: request._id,
		firstName: request.profile.firstName,
		lastName: request.profile.lastName,
		email: request.email,
		role: request.role
	};
}

exports.login = function (req, res, next) {
	let userInfo = setUserInfo(req.user);
	res.status(200).json({
		token: 'JWT ' + generateToken(userInfo),
		user: userInfo
	});
};

exports.register = function (req, res, next) {
	// Check for registration errors
	const email = req.body.email;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const password = req.body.password;

	// Return error if no email provided
	if (!email) {
		return res.status(422).send({ error: 'You must enter an email address.' });
	}

	// Return error if full name not provided
	if (!firstName || !lastName) {
		return res.status(422).send({ error: 'You must enter your full name.' });
	}

	// Return error if no password provided
	if (!password) {
		return res.status(422).send({ error: 'You must enter a password.' });
	}

	User.findOne({ email: email }, function (err, existingUser) {
		if (err) { return next(err); }

		// If user is not unique, return error
		if (existingUser) {
			return res.status(422).send({ error: 'That email address is already in use.' });
		}

		// If email is unique and password was provided, create account
		let user = new User({
			email: email,
			password: password,
			profile: { firstName: firstName, lastName: lastName }
		});

		user.save(function (err, user) {
			if (err) { return next(err); }
			// Respond with JWT if user was created
			let userInfo = setUserInfo(user);
			res.status(201).json({
				token: 'JWT ' + generateToken(userInfo),
				user: userInfo
			});
		});
	});
};

// Role authorization check
exports.roleAuthorization = function (role, req, res) {
	let code = 501;
	if (!req.user) {
		code = 422;
		res.status(422).json({ error: 'No user was found.' });
	} else if (req.user.role === role) {
		// If user is found, check role.
		code = 201;
	} else {
		code = 401;
		res.status(code).json(false);
	}
	return code;
};

// Constants for role types
exports.roles = {
	REQUIRE_ADMIN: 'Admin',
	REQUIRE_CLIENT: 'User'
};
