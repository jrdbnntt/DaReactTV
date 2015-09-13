
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

var genId = function() {
	var currDate = (new Date()).valueOf().toString();
	var random = Math.random().toString();
	return app.crypto.createHmac('sha1').update(currData + random).digest('hex');
};

var genPath = function(id) {
	return app.path.resolve(app.basePath + '/public/img/static/'+id+'.png');
};

io.on('connection', function(socket) {
	app.socket = socket;
	console.log('connected');

	socket.on('webcam', function(data) {
		var buffer = new Buffer(data.picture.slice(22), 'base64');
		console.log('uploading...');
		
		var imgId = genId();
		var imgPath = genPath(imgId);
		app.fs.writeFile(imgPath, buffer, function(err){
			if(err) {
				console.log(err);
				return;
			}
			console.log('uploaded at ' + imgPath);
			
			var ref = new Firebase('https://'+app.firebaseApp+'.firebaseio.com/showId/'+app.show.showid+'/eventId/'+data.eventId+'/images');
			ref.push(imgId);
			
		});
	});
});