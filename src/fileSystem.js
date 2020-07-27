const fs = require('fs');

module.exports = {

  read: (path, callback) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        callback({err: "File not found"});
      } else {
        callback({data: data});
      }
    });
  },

  write: (path, data, callback) => {
    fs.writeFile(path, data, (err) => {
      if (err) callback(0);
      callback(1);
    })
  },

  exists: (path, callback) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      callback(!err)
    });
  }
}
