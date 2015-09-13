
module.exports = function(app) {
	
	app.controllers.APIController = {
		uploadImage: function(req, res) {
			console.log(req.body);
		}
	};
};