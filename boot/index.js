
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
		var buffer = new Buffer(data.slice(22), 'base64');
		console.log('upload');
		app.fs.writeFile(app.path.resolve(app.basePath + 'public/img/static/test.png'), buffer, function(err){
			console.log('done ' + err);
			
		});
	});
	
	socket.on('tv-start', function(data) {
		// data.showId
		// 

		// socket.emit('')
		
		
	});
});