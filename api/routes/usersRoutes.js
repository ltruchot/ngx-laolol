'use strict';
const passport = require('passport');
const passportService = require('./../passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
	var users = require('../controllers/usersController');
	app.route('/api/register')
		.post(users.register);

	app.route('/api/login')
		.post(requireLogin, users.login);

	app.route('/api/isadmin')
		.get(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				res.status(code).json(true);
			}
		});
};
