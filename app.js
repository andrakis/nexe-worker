/**
 * NEXE Test - Worker messages using bundled worker.
 */

var child_process = require('child_process');
var computecluster= require('compute-cluster');

var worker;
/**
 * This is the documented nexe method for bundling additional files.
 */
var dummyIncludeForNexe = false;
if( dummyIncludeForNexe ) {
	worker = require('./worker.js');
}

var cc = new computecluster( { module: './worker.js',
                               max_backlog: 5000,
                               skip_fs_check: true,
                               parent_pid: process.pid });
cc.on('error', function(e) {
	console.log("ComputeCluster Error: " + e.toString());
});
cc.on('info', function(i) {
	console.log("ComputeCluster Info: " + i);
});

cc.enqueue('test', function(err, res) {
	console.log("Got from worker: " + res);
	process.exit(0);
});
