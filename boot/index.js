
var express = require('express');

var app = express();

require('./config')(app);
require('./routes.js')(app);

app.listen(app.get('port'), function() {
	console.log('Server listening at http://localhost:'+app.get('port')+'/');
});