
//配合 express.js 实现 

//导入 http 模块
var http = require("http")

//导入 fs  模块
var fs = require("fs")

//导入 url 模块
var url = require("url")

//导入 path 模块
var path = require("path")

//引入 ejs 引擎
var ejs = require("ejs")

//导入自己封装的类似于 node  的 express 框架
var app = require('./express.js')

//创建http服务
http.createServer(app).listen(8088)

//登录
app.get('/login', function (req, res) {

  console.log("login")
  ejs.renderFile('views/login.ejs', function (err, data) {

    res.send(data)
  })

})

//dologin
app.post('/dologin', function (req, res) {

  console.log('dologin')

  ejs.renderFile('views/dologin.ejs', function (err, data) {

    if (err) {
      console.log(err)
      return false
    }

    res.send(data)

  })
})


app.get('/index', function (req, res) {

  ejs.renderFile('views/index.ejs', {}, function (err, datStr) {

    if (err)
      return false
    res.send(datStr)

  })
})
