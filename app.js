//脚本里引用MongoDB客户端的代码
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server.');
  db.close();
});

//插入数据
//TypeError: db.collection is not a function,how to solve?
var insertDocument = function(db, callback) {
    db.collection('restaurants').insertOne( {
       "address" : {
          "street" : "2 Avenue",
          "zipcode" : "10075",
          "building" : "1480",
          "coord" : [ -73.9557413, 40.7720266 ]
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
    }, function(err, result) {
     assert.equal(err, null);
     console.log("Inserted a document into the restaurants collection.");
     callback();
   });
 };

 MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
      db.close();
    });
  });

  //查询操作
  var findRestaurants = function(db, callback) {
    var cursor =db.collection('restaurants').find( );
    cursor.each(function(err, doc) {
       assert.equal(err, null);
       if (doc !== null) {
         console.dir(doc);
       } else {
         callback();
       }
    });
 };

 MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findRestaurants(db, function() {
        db.close();
    });
  });

  //更新数据
  //更新指定文档。updateOne方法返回更新的文档的数目
  var updateRestaurants = function(db, callback) {
    db.collection('restaurants').updateOne(
       { "name" : "Juni" },
       {
         $set: { "cuisine": "American (New)" },
         $currentDate: { "lastModified": true }
       }, function(err, results) {
       console.log(results);
       callback();
    });
 };
 
 MongoClient.connect(url, function(err, db) {
   assert.equal(null, err);
 
   updateRestaurants(db, function() {
     db.close();
   });
 });

 //删除数据
 //删除符合条件的所有文档。
 var removeRestaurants = function(db, callback) {
    db.collection('restaurants').deleteMany(
       { "borough": "Manhattan" },
       function(err, results) {
          console.log(results);
          callback();
       }
    );
 };
 
 MongoClient.connect(url, function(err, db) {
   assert.equal(null, err);
 
   removeRestaurants(db, function() {
       db.close();
   });
 });