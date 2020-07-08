const fs = require('fs');

module.exports = {
    read: function (path, callback){
        fs.readFile(path, 'utf8', function(err, data){
            if(err){
                callback({err: "File not found"});
            }
            else
            {
                callback({data: data});
            }
        });
    }
}