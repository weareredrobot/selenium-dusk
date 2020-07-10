const fs = require('fs');

module.exports = {
    read(path, callback){
        fs.readFile(path, 'utf8', function(err, data){
            if(err){
                callback({err: "File not found"});
            }
            else
            {
                callback({data: data});
            }
        });
    },

    write (path, data, callback){
        fs.writeFile(path, data, function(err){
            if(err) callback(0);
            callback(1);
        })
    },

    exists (path, callback){
        fs.access(path, fs.constants.F_OK, (err) => {
            if(err){
                callback(0);
            } else {
                callback(1);
            }
        })
    }
}