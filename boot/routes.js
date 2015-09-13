

bodyParser = require('body-parser');

module.exports = function(app) {
	
	var jsonParser = bodyParser.json();
	var urlencodedParser = bodyParser.urlencoded({extended: false});
	
	// Main page for DVR
	app.get('/', app.controllers.IndexController.index);
	
	app.get('/editShows', app.controllers.IndexController.editShows);
	
	app.get('/testingFirebase', function(req, res) {
		res.sendFile(app.basePath + '/public/testingFirebase.html');
	});
	
	app.get('/queryingFirebase', function(req, res) {
		res.sendFile(app.basePath + '/public/queryingFirebase.html');
	});
	
	/**
	 * API
	 */
	app.post('/api/uploadImage', app.controllers.APIController.uploadImage);
	
	
	// 404
	app.get('*', function(req, res) {
		res.status(404);
		res.send({
			error: '404'
		});
	});
};