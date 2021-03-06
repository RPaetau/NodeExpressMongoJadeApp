﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var routes = require('./routes/index');
var users = require('./routes/users');
var exercise = require('./routes/exercise');
var exerciseProgram = require('./routes/exerciseProgram');
var programLog = require('./routes/programLog');

var app = express();

var mongoUri = 'mongodb://localhost:27017/test';
//mongoClient.connect(mongoUri, function (err, db) {
//	assert.equal(null, err);
//	console.log("Connected to mongodb");
//	insertDocument(db, function () { });
	
//});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/exercise', exercise);
app.use('/createExercise', exercise);
app.use('/exerciseProgram', exerciseProgram);
app.use('/createExerciseProgram', exerciseProgram);
app.use('/programLog', programLog);
app.use('/createProgramLog', programLog);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;


var insertDocument = function (db, callback) {
	db.collection('restaurants').insertOne({
		"address" : {
			"street" : "2 Avenue",
			"zipcode" : "10075",
			"building" : "1480",
			"coord" : [-73.9557413, 40.7720266]
		},
		"borough" : "Manhattan",
		"cuisine" : "Italian",
		"grades" : [
			{
				"date" : new Date("2014-10-01T00:00:00Z"),
				"grade" : "A",
				"score" : 11
			},
			{
				"date" : new Date("2014-01-16T00:00:00Z"),
				"grade" : "B",
				"score" : 17
			}
		],
		"name" : "Vella",
		"restaurant_id" : "41704620"
	}, function (err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
        callback(result);
        db.close();
	});
};