'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
	fr: {
		type: String,
		Required: 'A french tranlsation is needed'
	},
	en: {
		type: String,
		Required: 'An english tranlsation is needed'
	},
	lo: {
		type: String,
		Required: 'A lao tranlsation is needed'
	}
});
module.exports = mongoose.model('Word', WordSchema);
