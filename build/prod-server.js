const express = require('express');
var path = require('path')
const app = express();
var config = require('../config')
var appData = require("../data.json");
var data = appData;
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var port = process.env.PORT || config.dev.port

let indexPath = path.join(__dirname,"../dist");
app.use(express.static(indexPath));



app.get('/data/seller',function(req,res){
	res.json({
		errno:0,
		seller:seller
	});
})
app.get('/data/goods',function(req,res){
	res.json({
		errno:0,
		goods:goods
	});
})
app.get('/data/ratings',function(req,res){
	res.json({
		errno:0,
		ratings:ratings
	});
})
app.get('*', function (req, res) {
  res.sendFile(path.join(indexPath, './index.html'));
})



var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting prod server...')



const server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})