
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var formidable = require('formidable');
var fs = require('fs-extra');
var Q = require('q');
var inspect = require('util').inspect;
var crypto = require('crypto');
var Firebase = require('firebase');
var http = require('http');

module.exports = function(app) {
	app.path = path;
	app.formidable = formidable;
	app.fs = fs;
	app.Q = Q;
	app.inspect = inspect;
	app.crypto = crypto;
	app.http = http;
	
	app.firebaseApp = 'dareacttv';
	app.fb = Firebase('https://'+app.firebaseApp+'.firebaseio.com');
	
	app.basePath = app.path.resolve(__dirname + '/../');
	app.set('port', process.env.PORT || 4005);
	app.use(express.static(app.basePath + '/public'));
	app.use(morgan('dev'));
	
	
	app.waitAsync = function(seconds) {
		var dfd = app.Q.defer();
		
		setTimeout(function(){
			dfd.resolve();
		}, seconds*1000);
		
		return dfd.promise;
	};
	
	app.controllers = {};
	require(app.path.resolve(app.basePath + '/app/controllers/index.js'))(app);
	require(app.path.resolve(app.basePath + '/app/controllers/api.js'))(app);
	
	
	
};


