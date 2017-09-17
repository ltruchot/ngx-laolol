'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThemesSchema = new Schema({
	uid: {
		type: String,
		required: 'A unique ID is needed.',
		unique: true
	},
	linkUid: String,
	displayPlural: Boolean,
	en: {
		desc: [String]
	},
	fr: {
		desc: [String]
	},
	lo: {
		desc: [String]
	},
	isBasic: Boolean,
	hasCapital: Boolean,
	hasImages: Boolean,
	hasSpecialExample: Boolean,
	noArticle: Boolean,
	noKaraoke: Boolean,
	noPlural: Boolean,
	levels: Number,
	laoClassifierUid: String,
	_userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Theme', ThemesSchema);
