'use strict';
var mongoose = require('mongoose');
var Item = mongoose.model('Item');

exports.listItems = function (req, res) {
	Item.find({}, function (err, item) {
		if (err) {
			res.send(err);
		}
		res.json(item);
	});
};

exports.createItem = function (req, res) {
	const docs = [];
	req.body.forEach(item => {
		item._userId = req.user._id;
		docs.push(new Item(item));
	});
	Item.insertMany(docs).then(items => {
		console.log('no error', items);
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
	Item.findOneAndUpdate(req.params.itemId, req.body, {new: true}, function (err, item) {
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
