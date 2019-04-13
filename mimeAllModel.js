

module.exports = function (fs,extname) {

  //readFileSync 是同步读取
  var data = fs.readFileSync("./mime.json")

  var mimeModel = JSON.parse(data.toString())

  return mimeModel[extname]
}