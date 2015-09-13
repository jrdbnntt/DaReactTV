
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
		},
		
		setShow: function(req, res) {
			var show = {
				showId: req.body.showId,
				events: req.body.events
			};
			app.show = show;
			
			app.inspect(show);
			console.log('WAITING FOR EMISSIONS...');
			var i;
			var shoot = function(i) {
				app.waitAsync(show.events[i].waitTime)
				.then(function(){
					console.log('SOCKET EMIT: eventId:' + show.events[i].eventId);
					app.socket.emit('takePic', show.events[i].eventId);
				});
			};
			
			for(i = 0; i < show.events.length; ++i) {
				shoot(i);
			}
			
			res.json({});
		}		
	};
};