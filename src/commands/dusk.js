module.exports = function() {
    this.click = function(cssPath){
        return '$browser->assertPresent("' + cssPath + '")->click("' + cssPath + '");\n';
    }
    
    this.open = function(target){
        return '$browser->visit("' + target + '");\n'
    }

    this.type = function(cssPath, value){
        return '$browser->type("' + cssPath + '","' + value + '");\n'
    }

    this.setWindowSize = function(value){
        var split = value.split("x");
        return '$browser->resize(' + split[0] + ', ' + split[1] + ');\n' 
    }

    this.sendKeys = function(cssPath, value){
        return convertKey(cssPath, value);
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