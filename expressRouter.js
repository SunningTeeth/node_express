

//模拟 web服务器

//导入 http 模块
var http = require("http")

//导入 fs  模块
var fs = require("fs")

//导入 url 模块
var url = require("url")

//导入 path 模块
var path = require("path")

var mimemodel = require("./mimeAllModel.js")

console.log( mimemodel )

//创建http服务
http.createServer(function (req, res) {


  //获取url地址  去掉传递的参数
  var pathname = url.parse(req.url).pathname

  //获取文件后缀名  index.html  ==> .html
  var extname = path.extname(pathname)

  if (pathname == "/") {
    pathname = "index.html"//默认加载首页
  }

  if (pathname != '/favicon.ico') {



    fs.readFile("static/" + pathname, function (err, data) {

      if (err) { //没有这个页面

        fs.readFile("static/404.html", function (err404, data404) {
          if (err404) {

            console.log(err404)
            return false

          }

          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })

          res.write(data404)

          res.end()

        })

      } else {//存在这个页面

        var mime = mimemodel(fs,extname)

        res.writeHead(200, { "Content-Type": ""+ mime +";charset=utf-8" })

        res.write(data)

        res.end()
      }



    })





  }



}).listen(8088)
