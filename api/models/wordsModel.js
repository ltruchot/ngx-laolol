'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
	uid: {
		type: String,
		Required: 'An universal ID is needed.'
	},
	en: {
		wrd: {
			type: String,
			Required: 'An english translation is needed.'
		},
		kk: {
			en: String,
			fr: String,
			lo: String
		},
		ex: String,
		sound: String
	},
	fr: {
		wrd: {
			type: String,
			Required: 'An english translation is needed.'
		},
		kk: {
			en: String,
			fr: String,
			lo: String
		},
		ex: String,
		sound: String
	},
	lo: {
		wrd: {
			type: String,
			Required: 'An english translation is needed.'
		},
		kk: {
			en: String,
			fr: String,
			lo: String
		},
		ex: String,
		sound: String
	},
	themes: {
		type: [String],
		Required: 'At least one tag is required.'
	},
	meta: {
		contrary: String
	}
});
module.exports = mongoose.model('Word', WordSchema);
