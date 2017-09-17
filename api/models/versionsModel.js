'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = new Schema({
	current: {
		type: Number,
		required: true
	},
	checkUniqueDoc: {
		type: Number,
		unique: true,
		required: true
	}
});

module.exports = mongoose.model('Version', VersionSchema);
