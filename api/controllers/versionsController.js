'use strict';
const { spawnSync } = require('child_process');
const path = require('path');
var mongoose = require('mongoose');
var Version = mongoose.model('Version');
let config = require('./../config');

function dump (ts) {
	spawnSync('mongodump', [
		'--host', config.dbhost,
		'--port', config.dbport,
		'--username', config.dbuser,
		'--password', config.dbpass,
		'--db', config.dbname,
		'--out', path.join(__dirname, '..', 'backups', ts),
		'--gzip'
	]);
}

function restore (ts) {
	spawnSync('mongorestore', [
		'--host', config.dbhost,
		'--port', config.dbport,
		'--username', config.dbuser,
		'--password', config.dbpass,
		'--db', config.dbname,
		'--in', path.join(__dirname, '..', 'backups', ts, 'laolol'),
		'--drop'
	]);
}

exports.createVersion = function (req, res) {
	const doc = new Version({
		current: config.lastVerifiedBackup,
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
			const ts = (new Date()).getTime() + '';
			dump(ts);
			docs[0].current = ts;
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

exports.restoreVersion = function (req, res) {
	Version.find({}, function (err, docs) {
		if (err) {
			res.send(err);
		}
		if (docs[0] && docs[0].current) {
			restore(docs[0].current);
			res.json('Version document successfully deleted');
		} else {
			res.status(404).send('Can\'t find version document.');
		}
	});
};
