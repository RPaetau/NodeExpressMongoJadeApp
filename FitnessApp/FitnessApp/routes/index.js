var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var mongoUri = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function (req, res) {
	
	mongoClient.connect(mongoUri, function (err, db) {
		assert.equal(null, err);
		findRestaurants(db, function () {
			db.close();
		});
	});
	
	
	

    res.render('index', { title: 'Express' });
});

module.exports = router;

var findRestaurants = function (db, callback) {
	var cursor = db.collection('restaurants').find();
	cursor.each(function (err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};