module.exports = {
    commands: function(uploadsBasePath, commands, counter)
    {
        const Dusk = require('./commands/dusk');
        const converter = new Dusk();

        var duskTest = "";

        return new Promise((resolve, reject) => {
            for(var i = 0; i < commands.length; i++){
                if(commands[i].command in converter && typeof converter[commands[i].command] === "function"){

                    if(commands[i].targets.length > 0){

                        getCSSFinder(commands[i].targets, function(cssPath){
                            var duskMethod = converter[commands[i].command](cssPath, commands[i].value, commands[i].target, uploadsBasePath);
                            duskTest += duskMethod;
                        })

                    } else{
                        var duskMethod = converter[commands[i].command](commands[i].target);
                        duskTest += duskMethod;
                    }
                }

                if(i + 1 >= commands.length){
                    var data = {function: duskTest, counter: counter};
                    resolve(data);
                } 
            }
        })
    }
}

function getCSSFinder(targets, callback){
    var found = false;

    for(var i = 0; i < targets.length; i++){
        if(targets[i][0].includes("css=")){
            found = true;

            //Remove "css="
            callback(targets[i][0].substr(targets[i][0].indexOf("=") + 1));
        }

        if(i + 1 >= targets.length && !found){
            callback("");
        }
    }
}