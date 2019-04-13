
//封装 express 

//导入 url 模块
var url = require('url')

function changeRes(res) {

  res.send = function (data) {

    res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });

    res.end(data);
  }

}

//向外暴露的对象
var Server = function () {

  //全局
  var G = this;

  //处理 get 请求
  G._get = {}

  //处理 post 请求
  G._post = {}

  var app = function (req, res) {

    changeRes(res)

    //获取路由
    var pathname = url.parse(req.url).pathname

    if (!pathname.endsWith('/')) {
      pathname = pathname + '/';
    }

    //获取请求的方法   get or post
    var method = req.method.toLowerCase();

    if (G["_" + method][pathname]) {

      if (method == "get") {

        G['_' + method][pathname](req, res)
        res.end()

      } else if (method == "post") {

        var str = "";
        req.on("data", function (data) {
          str += data
        })

        req.on("end", function () {
          //post 获取请求的参数
          console.log(str)
          G['_' + method][pathname](req, res)

        })

      }



    } else {

      res.end(" no this router ")
    }

  }

  app.get = function (str, callback) {

    //以下代码 把  /login  ==> /login/
    if (!str.endsWith('/')) {
      str = str + '/';
    }
    if (!str.startsWith('/')) {
      str = '/' + str;

    }

    G._get[str] = callback

  }

  app.post = function (str, callback) {


    //以下代码 把  /login  ==> /login/
    if (!str.endsWith('/')) {
      str = str + '/';
    }
    if (!str.startsWith('/')) {
      str = '/' + str;

    }
    G._post[str] = callback

  }

  return app


}


module.exports = Server()