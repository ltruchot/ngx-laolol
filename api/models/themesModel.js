'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThemesSchema = new Schema({
	uid: {
		type: String,
		required: 'A unique ID is needed.',
		unique: true
	},
	linkUid: {
		type: String,
		required: 'A unique link UID is needed.',
		unique: true
	},
	displayPlural: Boolean,
	hasCapital: Boolean,
	hasImages: Boolean,
	hasSpecialExample: Boolean,
	hasWeight: Boolean,
	isBasic: Boolean,
	isLaoAlphabet: Boolean,
	isVisible: Boolean,
	noArticle: Boolean,
	noKaraoke: Boolean,
	noPlural: Boolean,
	noMoreInfos: Boolean,
	validated: Boolean,
	laoClassifierUid: String,
	levels: Number,
	en: {
		desc: [String]
	},
	fr: {
		desc: [String]
	},
	lo: {
		desc: [String]
	},
	_userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Theme', ThemesSchema);
