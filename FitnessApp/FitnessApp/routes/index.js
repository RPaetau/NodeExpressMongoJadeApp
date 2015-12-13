var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var mongoUri = 'mongodb://localhost:27017/test';
var stuff = [];
/* GET home page. */
router.get('/', function (req, res) {
	
    mongoClient.connect(mongoUri, function (err, db) {
        console.log("got here");
		assert.equal(null, err);
		findRestaurants(db, function () {
            db.close();

            res.render('index', { title: 'Express', stuff: stuff });
		});
	});
	
	
/* POST form. */
router.post('/', function (req, res) {
    //get form info and save it.    
    var data = req.body;
    res.redirect('form');
});	


});

module.exports = router;

var findRestaurants = function (db, callback) {
	var cursor = db.collection('restaurants').find();
	cursor.each(function (err, doc) {
		assert.equal(err, null);
		if (doc != null) {
            console.dir(doc);
		    stuff.push(doc);
		} else {
			callback();
		}
	});
};