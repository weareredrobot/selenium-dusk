module.exports = {
    click: function click(cssPath){
        return '$browser->assertPresent("' + cssPath + '")->click("' + cssPath + '");\n';
    },
    
    open: function open(target){
        return '$browser->visit("' + target + '");\n'
    },

    type:function type(cssPath, value){
        return '$browser->type("' + cssPath + '","' + value + '");\n'
    },

    setWindowSize: function setWindowSize(value){
        var split = value.split("x");
        return '$browser->resize(' + split[0] + ', ' + split[1] + ');\n' 
    },

    sendKeys: function sendKeys(cssPath, value){
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