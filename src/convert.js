const { indexOf } = require("lodash");

module.exports = {
    commands: function(commands, counter)
    {
        var duskTest = "";

        return new Promise((resolve, reject) => {
            for(var i = 0; i < commands.length; i++){
                if(commands[i].command in global && typeof global[commands[i].command] === "function"){

                    if(commands[i].targets.length > 0){

                        getCSSFinder(commands[i].targets, function(cssPath){
                            var duskMethod = global[commands[i].command](cssPath, commands[i].value, commands[i].target);
                            duskTest += duskMethod;
                        })

                    }
                    else{

                        var duskMethod = global[commands[i].command](commands[i].target);
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

global.click = function click(cssPath){
    return '$browser->assertPresent("' + cssPath + '")->click("' + cssPath + '");\n';
}

global.open = function open(target){
    return '$browser->visit("' + target + '");\n'
}

global.type = function type(cssPath, value){
    return '$browser->type("' + cssPath + '","' + value + '");\n'
}

global.setWindowSize = function setWindowSize(value){
    var split = value.split("x");
    return '$browser->resize(' + split[0] + ', ' + split[1] + ');\n' 
}

global.sendKeys = function sendKeys(cssPath, value){
    return convertKey(cssPath, value);
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

function convertKey(cssPath, key)
{
    const keyConversion = {
        '{enter}': "${KEY_ENTER}"
    }

    var found = false;

    for(var i = 0; i < Object.keys(keyConversion).length; i++){

        if(keyConversion[Object.keys(keyConversion)[i]] == key){
            found = true;
            return '$browser->keys("' + cssPath + '", "' + Object.keys(keyConversion)[i] + '");\n';
        }

        if(i + 1 >= Object.keys(keyConversion).length && !found){
            return "Couldn't find key";
        }

    }
}

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}