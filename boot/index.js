
var express = require('express');
var sio = require('socket.io');
var app = express();

require('./config')(app);
require('./routes.js')(app);

var server;

server = app.listen(app.get('port'), function() {
	console.log('Server listening at http://localhost:'+app.get('port')+'/');
});

var io = sio.listen(server);

io.on('connection', function(socket) {
	socket.on('webcam', function(data) {
		// var buffer = new Buffer(data.slice(23), 'base64');
		console.log('upload');
		app.fs.writeFile('/tmp/test.png', data, function(err){
			console.log('done ' + err);
			
		});
	});
});