'use strict';
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

exports.listItems = function (req, res) {
	var filter = {};
	for (var k in req.query) {
		if ((/^[a-z0-9|,|-]+$/i).test(req.query[k])) {
			if (k === 'includes' && req.query[k] !== 'all') {
				filter['themes'] = { '$in': req.query[k].split(',') };
			} else if (k === 'excludes') {
				filter['themes'] = filter['themes'] || {};
				filter['themes'].$nin = req.query[k].split(',');
			}
		}
	}
	Item.find(filter, function (err, item) {
		if (err) {
			res.send(err);
		}
		res.json(item);
	}).cache();
};

exports.createItem = function (req, res) {
	const docs = [];
	req.body.forEach(item => {
		item._userId = req.user._id;
		docs.push(new Item(item));
	});
	Item.insertMany(docs).then(items => {
		res.json(items);
	}, err => {
		console.log('error', err);
		res.status('400').send(err);
	});
};

exports.readItem = function (req, res) {
	Item.findById(req.params.itemId, function (err, item) {
		if (err) {
			res.send(err);
		}
		res.json(item);
	});
};

exports.updateItem = function (req, res) {
	delete req.body._id;
	Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {new: true}, function (err, item) {
		if (err) {
			res.send(err);
		}
		res.json(item);
	});
};

exports.deleteItem = function (req, res) {
	Item.remove({
		_id: req.params.itemId
	}, function (err, item) {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Item successfully deleted', _id: req.params.itemId });
	});
};
