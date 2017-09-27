const ROUTES_CONFIG = [{
	name: 'home',
	paths: { ລາວ: 'ໜ້າຫຼັກ', fr: 'accueil', en: 'home'},
	module: './home/home.module#HomeModule'
}, {
	name: 'gameboard',
	paths: { ລາວ: 'ຫ້ອງເກມ', fr: 'salle-de-jeu', en: 'gameboard'},
	module: './gameboard/gameboard.module#GameboardModule',
	param: ':uid'
}];
export { ROUTES_CONFIG };
