
var express = require('express');
var path = require('path');

module.exports = function(app) {
	
	app.basePath = path.resolve(__dirname + '/../');
	app.set('port', process.env.PORT || 4005);
	app.use(express.static(app.basePath + '/public'));

	console.log(app.basePath);
};


