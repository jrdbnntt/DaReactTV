
module.exports = function(app) {
	
	app.controllers.IndexController = {
		index: function(req, res) {
			res.sendFile(app.basePath + '/public/index.html');
		},
		
		editShows: function(req, res) {
			res.sendFile(app.basePath + '/public/editShows.html');
		}
	};
};