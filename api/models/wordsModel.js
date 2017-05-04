'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
	en: {
		type: String,
		Required: 'An english translation is needed.'
	},
	fr: {
		type: String,
		Required: 'A french translation is needed.'
	},
	lo: {
		type: String,
		Required: 'A lao translation is needed.'
	},
	kk: {
		type: String,
		Required: 'A karaoke translation is needed.'
	},
	themes: {
		type: [String],
		Required: 'At least one tag is required.'
	},
	meta: {
		fr: {
			isMale: Boolean,
			isPlural: Boolean,
			plural: String
		},
		lo: {},
		en: {}
	}
});
module.exports = mongoose.model('Word', WordSchema);
