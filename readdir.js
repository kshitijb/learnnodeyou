module.exports = function(filepath, ext, callback){
  const fs = require('fs')
  const path = require('path')
  const fileExtn = '.'+ext;
  fs.readdir(filepath, function(err, list){
    if (err)
      return callback(err)

    let filteredFiles = list.filter(function(item){
      if (path.extname(item) === fileExtn) {
          // console.log(item);
          return item
      }
    })

    callback(null, filteredFiles)
  })
}
