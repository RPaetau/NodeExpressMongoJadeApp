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
        assert.equal(null, err);
        var cursor = db.collection('exercises').find();
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                stuff.push(doc);
            } else {
                db.close();
                
                
                res.render('exercise', { stuff: stuff });
            }
        });

    });



});


/* POST form. */
router.post('/', function (req, res) {
    //get form info and save it.    
    var data = req.body;
    
    mongoClient.connect(mongoUri, function (err, db) {
        assert.equal(null, err);
        console.log("Connected to mongodb");
        db.collection('exercises').insertOne(data, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the exercises collection.");
            db.close();
        });
    });
    
    res.redirect('exercise');
});

module.exports = router;

