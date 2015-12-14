var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var mongoUri = 'mongodb://localhost:27017/test';
var stuff = [];
var exercisePrograms = [];
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
                
                mongoClient.connect(mongoUri, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.collection('exercisePrograms').find();
                    cursor.each(function (err, doc) {
                        assert.equal(err, null);
                        if (doc != null) {
                            exercisePrograms.push(doc);
                        } else {
                            db.close();
                            
                            
                            
                            
                            
                            res.render('exerciseProgram', { stuff: stuff, exercisePrograms : exercisePrograms });
                            stuff = [];
                            exercisePrograms = [];
                        }
                    });

                });



            }
        });

    });

});

/* POST form. */
router.post('/', function (req, res) {
    //get form info and save it.    
    var data = req.body;
    var obj = {}
    obj.program = [];

    var keyNames = Object.keys(data);
    keyNames.forEach(function(item) {
        obj.program.push(item);
    });

    mongoClient.connect(mongoUri, function (err, db) {  
        assert.equal(null, err);
        console.log("Connected to mongodb");
        db.collection('exercisePrograms').insertOne(obj, function (err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the exercisePrograms collection.");
            db.close();
            obj = null;
            
            res.redirect('exerciseProgram');
        });
    });


});

module.exports = router;

