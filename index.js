var chalk		= require('chalk'),
	exec		= require('child_process').exec,
	_			= require('lodash'),
	fs			= require('fs'),
	Q			= require('q');

function build (config, cb) {
	var options = config.type || 'compat',
		minify  = config.minify ? ' -p' : ' -d',
		output  = config.dest || __dirname + '/lodash.js',
		silent  = !!config.silent,
		cb	    = cb || _.noop,
		statFile= config.minify ? __dirname + '/lodash.min.js' : __dirname + '/lodash.js';
	
	options += minify;
	
	delete config.type;
	delete config.minify;
	delete config.silent;
	delete config.dest;
	
	options = _.reduce(config, function (acc, value, key) {
		if (_.isBoolean(value) && value) {
			acc += ' ' + key;
		} else if (_.isArray(value)){
			if (value.length) {
				acc += ' ' + key + '=' + value.join(',');
			}
		} else if (value) {
			acc += ' ' + key + '=' + value;
		}
		
		return acc;
	}, options);
	
	options += ' -s -o ' + output;
	
	var cmd = 'node ' + __dirname + '/node_modules/lodash-cli/bin/lodash ';
	
	exec(cmd + options, {
		maxBuffer: 1024 * 500,
	}, function (err, stdout, stderr) {
		if (err) {
			cb(err);return;
		}
		
		if (stderr) {
			cb(stderr);return;
		}
		
		if (!silent) {
			process.stdout.write(chalk.green('>>') + ' Lodash build has been written in ' + chalk.cyan(output));
			process.stdout.write('\n');
		}
		
		Q.all([Q.nfcall(fs.stat, statFile), Q.nfcall(fs.stat, output)])
			.then(function (stats) {
				var stats = {
					size: stats[0].size - stats[1].size,
					percent:  (stats[0].size - stats[1].size) / stats[0].size * 100
				};
				
				cb(null, output, stats);
			}, function () {
				console.log('err');
				cb(null, output, {});
			});
	});
}

module.exports = build;