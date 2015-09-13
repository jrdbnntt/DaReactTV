
module.exports = function(app) {
	
	app.controllers.APIController = {
		uploadImage: function(req, res) {
			console.log(req);
			
			var input = null;
			var form = new app.formidable.IncomingForm();
			
			form.parse(req, function(err, fields, files) {
				app.inspect(files);
				input = fields;
				if(err) {
					console.log(err);
					res.json({
						err: err
					});
					return;
				}
				
				app.inspect({
					fields: fields,
					files: files
				});
			});
			
			
			
			form.on('end', function(fields, files) {
				// tmp path
				
				
				var srcPath = this.openedFiles[0].path;
				console.log('TMP IMG PATH ' + srcPath);
				
				if(!input.image) {
					res.json({
						err: 'Missing image'
					});
					return;
				}
				res.json({});
				
			});
		}
	};
};