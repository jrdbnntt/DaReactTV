

bodyParser = require('body-parser');

module.exports = function(app) {
	
	var jsonParser = bodyParser.json();
	var urlencodedParser = bodyParser.urlencoded({extended: false});
	
	// Main page for DVR
	app.get('/', function(req, res) {
		res.sendFile(app.basePath + '/public/index.html');
	});
	
	app.get('/editShows', function(req, res) {
		res.sendFile(app.basePath + '/public/editShows.html');
	});
	
	
	
	/**
	 * API
	 */
	app.post('/api/upload', urlencodedParser, function(req, res) {
		// console.log(req)
	});
	
	
	// 404
	app.get('*', function(req, res) {
		res.status(404);
		res.send({
			error: '404'
		});
	});
};