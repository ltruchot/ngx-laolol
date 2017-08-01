'use strict';
const passport = require('passport');
const passportService = require('./../passport');
const users = require('../controllers/usersController');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = function (app) {
	var words = require('../controllers/wordsController');
	app.route('/api/words')
		.get(words.listWords)
		.post(requireAuth, (req, res) => {
			let code = users.roleAuthorization(users.roles.REQUIRE_ADMIN, req, res);
			if (code === 201) {
				words.createWord(req, res);
			}
		});

	app.route('/api/words/:wordId')
		.get(words.readWord)
		.put(requireAuth, words.updateWord)
		.delete(requireAuth, words.deleteWord);
};
