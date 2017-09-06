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
	imgAuthor: String,
	imgResource: String,
	themes: {
		type: [String],
		ref: 'Theme',
		required: 'At least one tag is required.'
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
		ex: String,
		img: String,
		snd: String,
		meta: Schema.Types.Mixed
	},
	meta: {
		contrary: String,
		conflict: [String],
		owner: String,
		ownerResource: String
	},
	_userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Item', ItemsSchema);
