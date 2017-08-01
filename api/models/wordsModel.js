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
			lo: String
		},
		ex: String,
		snd: String,
		meta: {
			plural: String,
			classifier: String,
			comment: String
		}
	},
	fr: {
		wrd: {
			type: String,
			Required: 'A french translation is needed.'
		},
		kk: {
			lo: String
		},
		ex: String,
		snd: String,
		meta: {
			plural: String,
			feminine: String,
			masculine: String,
			isMale: Boolean,
			comment: String
		}
	},
	lo: {
		wrd: {
			type: String,
			Required: 'A lao translation is needed.'
		},
		kk: {
			en: String,
			fr: String
		},
		ex: String,
		snd: String,
		meta: {
			feminine: String,
			masculine: String,
			comment: String
		}
	},
	themes: {
		type: [String],
		Required: 'At least one tag is required.'
	},
	img: String,
	meta: {
		contrary: String,
		conflict: [String]
	},
	_userId: { type: Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Word', WordSchema);
