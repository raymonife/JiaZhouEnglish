var mongo = require("./lib/mongodb");
var CollectionClazz = require("./lib/mongodb").CollectionClazz
var mongodbConfig = require("./setting/mongo.json")
mongo.init(mongodbConfig, function(){
	var coll = new CollectionClazz("test_table")
	coll.save({"name": "ray", "age": 31}, function(err){
		console.log("done:", err)
	})
});