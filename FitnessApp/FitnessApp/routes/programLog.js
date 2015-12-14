var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var mongoUri = 'mongodb://localhost:27017/test';
var stuff = [];
var exercisePrograms = [];
var programLogs = [];
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
                            
                            
                            mongoClient.connect(mongoUri, function (err, db) {
                                assert.equal(null, err);
                                var cursor = db.collection('programLogs').find();
                                cursor.each(function (err, doc) {
                                    assert.equal(err, null);
                                    if (doc != null) {
                                        programLogs.push(doc);
                                    } else {
                                        db.close();
                                        
                                        
                                        
                                        
                                        
                                        res.render('programLog', { stuff: stuff, exercisePrograms : exercisePrograms, programLogs : programLogs });
                                        stuff = [];
                                        exercisePrograms = [];
                                        programLogs = [];
                                    }
                                });

                            });
                            

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
    var id = req.body;
    var obj = {
        datetime : new Date()

    }

    mongoClient.connect(mongoUri, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('exercisePrograms').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null && doc._id.id) {
                obj.program = doc;
            } else {
                db.close();

                mongoClient.connect(mongoUri, function (err, db) {
                    assert.equal(null, err);
                    console.log("Connected to mongodb");
                    db.collection('programLogs').insertOne(obj, function (err, result) {
                        assert.equal(err, null);
                        console.log("Inserted a document into the programLogs collection.");
                        db.close();
                        obj = null;
                        
                        res.redirect('/programLog');
                    });
                });


            }
        });
    });


});

module.exports = router;