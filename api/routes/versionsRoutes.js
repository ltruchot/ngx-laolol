'use strict';
const passport = require('passport');
const passportService = require('./../passport');
const users = require('../controllers/usersController');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = function (app) {
	var versions = require('../controllers/versionsController');
	app.route('/api/version')
		.get(versions.readVersion)
		.post(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				versions.createVersion(req, res);
			}
		})
		.put(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				versions.updateVersion(req, res);
			}
		})
		.delete(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				versions.deleteVersion(req, res);
			}
		});
};
