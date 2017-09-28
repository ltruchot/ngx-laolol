import { ILanguage } from './../models/language.models';
const AVAILABLE_LANGUAGES: ILanguage[] = [{
	urlCode: 'en',
	code: 'en',
	flag: 'us',
	learnCode: 'lo',
	label: 'english',
	tradLabel: 'words.languageEnglish'
}, {
	urlCode: 'fr',
	code: 'fr',
	flag: 'fr',
	learnCode: 'lo',
	label: 'français',
	tradLabel: 'words.languageFrench'
}, {
	urlCode: 'ລາວ',
	code: 'lo',
	flag: 'la',
	learnCode: 'en',
	label: 'ພາສາລາວ',
	tradLabel: 'words.languageLao',
	noPlural: true
}];
export { AVAILABLE_LANGUAGES };
