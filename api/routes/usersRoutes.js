'use strict';
const passport = require('passport');
const passportService = require('./../passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// Constants for role types
const REQUIRE_ADMIN = 'Admin';
const REQUIRE_OWNER = 'Owner';
const REQUIRE_MEMBER = 'Member';
const REQUIRE_CLIENT = 'Client';

module.exports = function (app) {
	var users = require('../controllers/usersController');
	app.route('/api/register')
		.post(users.register);

	app.route('/api/login')
		.post(requireLogin, users.login);
};
