
module.exports = function(app) {
	
	app.controllers.APIController = {
		uploadImage: function(req, res) {
			console.log(req.body);
			var input = null;
			var form = new app.formidable.IncomingForm();
			
			form.parse(req, function(err, fields, files) {
				input = fields;
				if(err) {
					res.json({
						err: err
					});
					return;
				}
			});
			
			form.on('end', function(fields, files) {
				// tmp path
				var srcPath = this.openedFiled[0].path;
				console.log('TMP IMG PATH ' + srcPath);
				
				if(!input.image) {
					res.json({
						err: 'Missing image'
					});
					return;
				}
				
			});
		}
	};
};