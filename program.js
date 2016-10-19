function helloWorld(){
  console.log("HELLO WORLD")
}
// helloWorld()

function sumArgvs(){
  var sum = 0;
  for (var i = 2; i < process.argv.length; i++) {
    sum += +process.argv[i]
  }
  console.log(sum);
}
// sumArgvs()

function readFile(){
  var filePath = process.argv[2]
  var fs = require('fs')
  var str = fs.readFileSync(filePath).toString()
  let lines = str.split("\n")
  console.log(lines.length-1)
}
// readFile()

function readFileAsync(){
  let filePath = process.argv[2]
  const fs = require('fs')
  fs.readFile(filePath, 'utf8', function(err, data){
    if (!err){
      console.log(data.split('\n').length - 1);
    }
  });
}
// readFileAsync()

function readDir(){
  const dir = process.argv[2]
  const fileExtn = process.argv[3]
  const fs = require('fs')
  const path = require('path')
  fs.readdir(dir, function(err, list){
    if (!err) {
      list.forEach(function(item){
        if (path.extname(item).slice(1) === fileExtn) {
            console.log(item);
        }
      })
    }
  })
}
// readDir()

function readDirModular(){
  const dir = process.argv[2]
  const fileExtn = process.argv[3]
  const myModule = require('./readdir')
  myModule(dir, fileExtn, function(err, data){
    if (err)
      console.log(err);

    data.forEach(function(item){
      console.log(item);
    })
  })
}
// readDirModular()

function getHttp(){
  let http = require('http')
  const url = process.argv[2]
  http.get(url, function(response){
    response.setEncoding('utf8').on('data', function(data){
      console.log(data);
    })
  })
}
// getHttp()

function getHttpCollect(){
  let http = require('http')
  let bl = require('bl')
  const url = process.argv[2]
  http.get(url, function(response){
    response.pipe(bl(function(err, data){
      console.log(data.toString().length)
      console.log(data.toString())
    }))
  })
}
// getHttpCollect()

function getHttpCollect3(){
  let http = require('http')
  let bl = require('bl')
  for (var i = 2; i < process.argv.length; i++) {
    http.get(process.argv[i], function(response) {
      response.pipe(bl(function(err, data){
        if (err)
          console.log(err)
        console.log(data.toString())
      }))
    })
  }
}
// getHttpCollect3()

function connectTCP(){
  let net = require('net')
  let strftime = require('strftime')
  var server = net.createServer(function(socket){
    socket.end(strftime('%Y-%m-%d %H:%M%n'))
  })
  server.listen(process.argv[2])
}
// connectTCP()

function httpServer(){
  let port = process.argv[2]
  let filePath = process.argv[3]
  let fs = require('fs')
  let http = require('http')
  let bl = require('bl')
  var stream = fs.createReadStream(filePath)
  var server = http.createServer(function(request, response){
    // stream.pipe(bl(function(err, data){
    //   response.end(data.toString())
    // }))
    stream.on('readable', () => {
      response.end(stream.read())
    })
  })
  server.listen(port)
}
// httpServer()

function httpUpperCase(){
  let port = process.argv[2]
  let http = require('http')
  let map = require('through2-map')
  var server = http.createServer(function(request, response){
    if (request.method === 'POST') {
      request.pipe(map(function(chunk){
        return chunk.toString().toUpperCase()
      })).pipe(response)
    } else {
      response.end('Wrong request method')
    }
  })
  server.listen(port)
}
// httpUpperCase()

function httpServer2(){
  let port = process.argv[2]
  let http = require('http')
  let urlModule = require('url')
  var server = http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'application/json' })
    var url = urlModule.parse(request.url, true)
    var date = new Date(url.query.iso)
    var resObj = {}
    switch (url.pathname) {
      case '/api/parsetime':
        resObj["hour"] = date.getHours()
        resObj["minute"] = date.getMinutes()
        resObj["second"] = date.getSeconds()
        break
      case '/api/unixtime':
        resObj["unixtime"] = date.getTime()
        break
      default:
        resObj = {}
        break
    }
    response.end(JSON.stringify(resObj))
  })
  server.listen(port)
}
httpServer2()
