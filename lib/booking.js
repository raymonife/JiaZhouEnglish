var mongodb = require("./mongodb")
var CollectionClazz = mongodb.CollectionClazz
var coll = new CollectionClazz("appointment");
var ObjectID = require('mongodb').ObjectID;

var save = function(params){
	var _obj = {};
	_obj.name = params.site.obj_name;
	_obj.qq = params.site.obj_qq;
	_obj.tel = params.site.obj_tel;
	_obj.wx = params.site.obj_wx;
	_obj.email = params.site.obj_email;
	_obj.status = 0;
	console.log(params);
	mongodb.getSeqId("appointment", function(err, _id){
		if(err){
			consle.log("Error", error)
		}else{
			_obj.seqId = _id;
			coll.save(_obj,function(){})
		}
	})
}

var get = function(type, cb){
	if(type === "all"){
		var query = {};
	}else if (type === "nodone"){
		var query = {status: 0}
	}else if (type === "done"){
		var query = {status: 1}
	}
	coll.find(query, function(err, data){
		cb(data)
	})
}

var update = function(id, cb){
	console.log("id:", id)
	coll.update({"seqId": parseInt(id), "status": 0}, {$set:{status: 1}}, function(err){
		cb(err)
	});
}


exports.save = save;
exports.get = get;
exports.update = update;