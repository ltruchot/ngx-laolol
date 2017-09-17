'use strict';
var mongoose = require('mongoose');
var Version = mongoose.model('Version');

exports.createVersion = function (req, res) {
	const doc = new Version({
		current: 0,
		checkUniqueDoc: 1
	});
	doc.save().then(themes => {
		res.json(themes);
	}, err => {
		res.status('400').send(err);
	});
};

exports.readVersion = function (req, res) {
	Version.find({}, function (err, versions) {
		if (err) {
			res.send(err);
		}
		res.json(versions[0]);
	});
};

exports.updateVersion = function (req, res) {
	Version.find({}, function (err, docs) {
		if (err) {
			res.send(err);
		}
		if (docs[0]) {
			docs[0].current++;
			docs[0].save().then(doc => {
				res.json(doc);
			}, err => {
				res.send(err);
			});
		} else {
			res.status(404).send('Can\'t find version document.');
		}
	});
};

exports.deleteVersion = function (req, res) {
	Version.find({}, function (err, docs) {
		if (err) {
			res.send(err);
		}
		if (docs[0]) {
			docs[0].current++;
			docs[0].remove().then(doc => {
				res.json('Version document successfully deleted');
			}, err => {
				res.send(err);
			});
		} else {
			res.status(404).send('Can\'t find version document.');
		}
	});
};
