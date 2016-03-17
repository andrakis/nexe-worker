console.log("Worker starting up");

process.on('message', function(m) {
	var resp = "A response";
	console.log("Got message: " + m);
	process.send(resp);
});
