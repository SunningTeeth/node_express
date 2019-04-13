
//配合 model/express-router.js

// 导入 http 模块
var http = require("http")

//导入 url 模块
var url = require("url")

//导入 fs 模块
var fs = require("fs")

var app = require('./model/express-router.js')

http.createServer(app).listen(8084)


app.get('/login',function(req,res){
  console.log("loginddd")
})

app.get('/register',function(req,res){

  console.log('register');

  res.send('register');
})
