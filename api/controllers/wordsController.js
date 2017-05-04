'use strict';
var mongoose = require('mongoose');
var Word = mongoose.model('Word');

exports.listWords = function (req, res) {
	Word.find({}, function (err, word) {
		if (err) {
			res.send(err);
		}
		res.json(word);
	});
};

exports.createWord = function (req, res) {
	var newWord = new Word(req.body);
	newWord.save(function (err, word) {
		if (err) {
			res.send(err);
		}
		res.json(word);
	});
};

exports.readWord = function (req, res) {
	Word.findById(req.params.wordId, function (err, word) {
		if (err) {
			res.send(err);
		}
		res.json(word);
	});
};

exports.updateWord = function (req, res) {
	Word.findOneAndUpdate(req.params.wordId, req.body, {new: true}, function (err, word) {
		if (err) {
			res.send(err);
		}
		res.json(word);
	});
};

exports.deleteWord = function (req, res) {
	Word.remove({
		_id: req.params.wordId
	}, function (err, word) {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Word successfully deleted' });
	});
};
