// var categories = ['array', 'chain', 'collection', 'date', 'function', 'lang', 'object', 'number', 'string', 'utility'];

var builder = require('../index.js');
var dest = __dirname + '/lodash.js';
var config = {
	type: 'compat',
	include: ['first', 'isEmpty', 'indexOf', 'each', 'forIn', 'remove', 'template', 'uniqueId'],
	minus: ['at'],
	plus:['throttle', 'debounce'],
	category: ['chain', 'collection', 'string'],
	exports: ['none'],
	iife: null,
	modularize: false,
	template: null,
	settings: null,
	moduleId: null,
	minify: false,
	dest: dest,
	silent: false,
};

builder(config, function (err, output, stats) {
	if (err) {
		throw new Error(err);
	}
	
	if (dest !== output) {
		throw new Error('File has ot be written at path `' + dest + '`');
	}
	
	console.log(stats);
});