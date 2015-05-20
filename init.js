var builder = require('./'),
	chalk = require('chalk');

var config = {
	type: 'compat',
	minify: false,
	silent: true,
	dest: __dirname + '/lodash.js',
	stat: false,
	iife: null,
	modularize: false,
	template: null,
	settings: null,
	moduleId: null,
};

var configMin = {
	type: 'compat',
	minify: true,
	silent: true,
	dest: __dirname + '/lodash.min.js',
	stat: false,
	iife: null,
	modularize: false,
	template: null,
	settings: null,
	moduleId: null,
};

var cb =  function (err, file) {
	if (err) {
		process.stdout.write(chalk.red('!!') + err);
	}
};

builder(config, cb);
builder(configMin, cb);