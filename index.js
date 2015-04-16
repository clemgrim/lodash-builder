var chalk		= require('chalk'),
	exec		= require('child_process').exec,
	_			= require('lodash');

function build (config, cb) {
	var options = config.type || 'compat',
		minify = config.minify ? ' -p' : ' -d',
		output = config.dest || __dirname + '/lodash.js',
		silent = !!config.silent;
	
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
	
	exec('lodash ' + options, {
		cwd: __dirname + '/node_modules/lodash-cli/bin/',
		maxBuffer: 1024 * 500,
	}, function (err, stdout, stderr) {
		if (err) {
			throw new Error(err);
		}
		
		if (stderr) {
			throw new Error(stderr);
		}
		
		if (!silent) {
			process.stdout.write(chalk.green('>>') + ' Lodash build has been written in ' + chalk.cyan(output));
			process.stdout.write('\n');
		}
		
		if (_.isFunction(cb)) {
			cb();
		}
	});
}

module.exports = build;