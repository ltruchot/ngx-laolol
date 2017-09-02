'use strict';
const passport = require('passport');
const passportService = require('./../passport');
const users = require('../controllers/usersController');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = function (app) {
	var themes = require('../controllers/themesController');
	app.route('/api/themes')
		.get(themes.listThemes)
		.post(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201 && req.body instanceof Array) {
				themes.createThemes(req, res);
			} else {
				res.status('400').json({ error: 'Invalid data' });
			}
		});

	app.route('/api/themes/:themeId')
		.get(themes.readTheme)
		.put(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				themes.updateTheme(req, res);
			} else {
				res.status('400').json({ error: 'Invalid ids' });
			}
		})
		.delete(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				themes.deleteTheme(req, res);
			} else {
				res.status('400').json({ error: 'Invalid ids' });
			}
		});
};
