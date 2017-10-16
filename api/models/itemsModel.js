'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemsSchema = new Schema({
	uid: {
		type: String,
		required: 'A unique ID is needed.',
		unique: true
	},
	validated: Boolean,
	img: String,
	themes: {
		type: [String],
		ref: 'Theme'
	},
	lvl: Number,
	en: {
		wrd: {
			type: String,
			required: 'An english translation is needed.'
		},
		kk: {
			lo: String,
			ipa: String
		},
		kkEx: {
			lo: String,
			ipa: String
		},
		ex: String,
		img: String,
		snd: String,
		meta: Schema.Types.Mixed
	},
	fr: {
		wrd: {
			type: String,
			required: 'A french translation is needed.'
		},
		kk: {
			lo: String,
			ipa: String
		},
		kkEx: {
			lo: String,
			ipa: String
		},
		ex: String,
		img: String,
		snd: String,
		meta: Schema.Types.Mixed
	},
	lo: {
		wrd: {
			type: String,
			required: 'A lao translation is needed.'
		},
		kk: {
			en: String,
			fr: String,
			ipa: String
		},
		kkEx: {
			en: String,
			fr: String,
			ipa: String
		},
		ex: String,
		img: String,
		snd: String,
		meta: Schema.Types.Mixed
	},
	meta: {
		illustratorUid: String,
		contrary: String,
		conflicts: [String],
		owner: String,
		ownerResource: String,
		displayArticle: Boolean,
		weight: Number
	},
	_userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Item', ItemsSchema);
