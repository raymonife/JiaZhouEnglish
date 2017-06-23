var express = require("express");
var bodyParser = require("body-parser");
app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("static"))
//app.use(bodyParser.json());

var mongodbConfig = require("./setting/mongo.json")	
var booking = null;

require("./lib/mongodb").init(mongodbConfig, function(err){
	if(err) 
		console.log(err)
	else
		booking = require("./lib/booking");
});

app.set("view engine", "ejs");
app.use("/action/admin/get/deals", function(req, res){
	target = req.query.type || "all";
	booking.get(target, function(data){
		console.log("data:", JSON.stringify(data,null,2))
		res.render("deals", {"deals": data, "title": "查询记录"});
	})
})

app.use("/action/admin/update/deals", function(req, res){
	booking.update(req.query.id, function(){
		booking.get("all", function(data){
			console.log("data:", JSON.stringify(data,null,2))
			res.render("deals", {"deals": data, "title": "查询记录"});
		})
	})
})

app.use("/booking", function(req, res){
	booking.update(req.query.id, function(){
		res.end("update done:" + req.query.id)
	})
});

app.use("/deals", function(req, res){
	res.render("deals")
})

// about
app.use("/about", function(req, res){
	res.render("about", {"title": "关于加州"})
})

app.use("/teachers", function(req, res){
	res.render("teachers", {"title": "北美师资"})
})

app.use("/appointment/done", function(req, res){
	res.render("appointment_done", {"title": "预约", "message":"Welcome!"})
})

app.use("/appointment", function(req, res){
	res.render("appointment", {"title": "预约", "message":"Welcome!"})
})

app.post("/action/booking", function(req, res){
	booking.save(req.body);
	res.render("appointment_done", {"title": "预约", "message": "预约成功！"})
})

app.use("/", function(req, res){
	res.render("index", {"title": "加州英语"})
})

var http = require("http")
http.createServer(app).listen(7777);
console.log("start listen:7777")