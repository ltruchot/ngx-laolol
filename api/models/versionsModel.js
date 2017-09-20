'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = new Schema({
	current: {
		type: String,
		unique: true,
		required: true
	},
	checkUniqueDoc: {
		type: Number,
		unique: true,
		required: true
	}
});

module.exports = mongoose.model('Version', VersionSchema);
