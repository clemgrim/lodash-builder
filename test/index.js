// var categories = ['array', 'chain', 'collection', 'date', 'function', 'lang', 'object', 'number', 'string', 'utility'];

var builder = require('../index.js');

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
	dest: null,
	silent: false,
};

builder(config);