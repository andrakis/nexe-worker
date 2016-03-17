/**
 * NEXE Test - Worker messages using bundled worker.
 */

var child_process = require('child_process');

var worker;
/**
 * This is the documented nexe method for bundling additional files.
 */
var dummyIncludeForNexe = false;
if( dummyIncludeForNexe ) {
	worker = require('./worker.js');
}

/**
 * A simple worker interface that uses child_process.fork
 */
function Worker (worker_path) {
	this.module = worker_path;
}
Worker.prototype.start = function(args) {
	this.worker = child_process.fork(
		this.module,
		this.args || [],
		{ env: this.getEnv() }
	);
	this.worker.on('exit', this._on_exit);
};
Worker.prototype._on_exit = function(code) {
	console.log("Worker process exit: " + code);
};
Worker.prototype.getEnv = function() {
	var env = {};
	for(var i in process.env) env[i] = process.env[i];
	delete env['NODE_WORKER_ID'];
	delete env['NODE_UNIQUE_ID'];
	return env;
};
Worker.prototype.request = function(m, callback) {
	this.worker.once('message', function(recv) {
		console.log("Got from worker: " + recv);
		callback(recv);
	});
	this.worker.send(m);
};

/**
 * Create a worker (this should get bundled into the app).
 * Send it a message and on successful reply, exit the application.
 */
var worker = new Worker('./worker.js');
worker.start();
worker.request('test', function(res) {
	console.log('Test result: ' + res);
	console.log('Finished, exiting');
	process.exit(0);
});
