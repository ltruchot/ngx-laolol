const ROUTES_CONFIG = [{
	name: 'about',
	paths: { en: 'about', fr: 'a-propos', ລາວ: 'ກຽ່ວກັບ'},
	module: './about/about.module#AboutModule'
}, {
	name: 'blackboard',
	paths: { en: 'blackboard', fr: 'salle-de-cours', ລາວ: 'ຫ້ອງຮຽນ' },
	module: './blackboard/blackboard.module#BlackboardModule',
	urlParam: 'uid'
}, {
	name: 'exams',
	paths: { en: 'exams', fr: 'examens', ລາວ: 'ປະເມີນຜົນ' },
	module: './exams/exams.module#ExamsModule'
}, {
	name: 'gameboard',
	paths: { en: 'gameboard', fr: 'salle-de-jeu', ລາວ: 'ຫ້ອງເກມ' },
	module: './gameboard/gameboard.module#GameboardModule',
	urlParam: 'uid'
}, {
	name: 'home',
	paths: { en: 'home', fr: 'accueil', ລາວ: 'ໜ້າຫຼັກ' },
	module: './home/home.module#HomeModule'
}];
export { ROUTES_CONFIG };
