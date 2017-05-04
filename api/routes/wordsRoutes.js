'use strict';
module.exports = function (app) {
	console.log('wordsRoutes');
	var words = require('../controllers/wordsController');
	app.route('/words')
		.get(words.listWords)
		.post(words.createWord);

	app.route('/words/:wordId')
		.get(words.readWord)
		.put(words.updateWord)
		.delete(words.deleteWord);
};
