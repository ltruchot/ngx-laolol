'use strict';
const { spawnSync } = require('child_process');
const path = require('path');
const config = require('./api/config');
function restore () {
	spawnSync('mongorestore', [
		'--host', config.dbhost,
		'--port', config.dbport,
		'--username', config.dbuser,
		'--password', config.dbpass,
		'--db', config.dbname,
		'--dir', path.join(__dirname, 'fixtures', config.lastVerifiedBackup, config.dbname),
		'--drop',
		'--gzip'
	]);
}
restore();
