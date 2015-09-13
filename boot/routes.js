

bodyParser = require('body-parser');

module.exports = function(app) {
	
	var jsonParser = bodyParser.json();
	var urlencodedParser = bodyParser.urlencoded({extended: false});
	
	// Main page for DVR
	app.get('/', app.controllers.IndexController.index);
	
	app.get('/editShows', app.controllers.IndexController.editShows);
	
	
	
	/**
	 * API
	 */
	app.post('/api/uploadImage', urlencodedParser, app.controllers.APIController.uploadImage);
	
	
	// 404
	app.get('*', function(req, res) {
		res.status(404);
		res.send({
			error: '404'
		});
	});
};