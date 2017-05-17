'use strict';
const passport = require('passport');
const passportService = require('./../passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = function (app) {
	var words = require('../controllers/wordsController');
	app.route('/api/words')
		.get(words.listWords)
		.post(requireAuth, words.createWord);

	app.route('/api/words/:wordId')
		.get(words.readWord)
		.put(requireAuth, words.updateWord)
		.delete(requireAuth, words.deleteWord);
};
