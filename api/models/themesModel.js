'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThemesSchema = new Schema({
	uid: {
		type: String,
		required: 'A unique ID is needed.',
		unique: true
	},
	en: {
		wrd: {
			type: String,
			required: 'An english translation is needed.'
		},
		short: String,
		kk: {
			lo: String,
			ipa: String
		},
		desc: [String]
	},
	fr: {
		wrd: {
			type: String,
			required: 'An english translation is needed.'
		},
		short: String,
		kk: {
			lo: String,
			ipa: String
		},
		desc: [String]
	},
	lo: {
		wrd: {
			type: String,
			required: 'An english translation is needed.'
		},
		short: String,
		kk: {
			en: String,
			fr: String,
			ipa: String
		},
		desc: [String]
	},
	hasCapital: Boolean,
	hasImages: Boolean,
	hasSpecialExample: Boolean,
	noArticle: Boolean,
	noKaraoke: Boolean,
	noPlural: Boolean,
	levels: Number,
	laoClassifier: String,
	laoClassifierKk: {
		en: String,
		fr: String,
		ipa: String
	},
	laoClassifierSnd: String,
	_userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Theme', ThemesSchema);
