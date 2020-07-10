const path = require('path');

module.exports = function () {
  this.click = function (cssPath) {
    return `->assertPresent("${cssPath}")->click("${cssPath}")`;
  };

  this.open = function (target) {
    return `->visit("${target}")`;
  };

  this.type = function (cssPath, value, target, uploadsBasePath) {
    let uploadBasePath = value;

    if (value !== path.basename(value) && uploadsBasePath !== '') {
      const split = value.split('/');
      uploadBasePath = uploadsBasePath + split[split.length - 1];
    }
    return `->type("${cssPath}","${uploadBasePath}")`;
  };

  this.setWindowSize = function (value) {
    const split = value.split('x');
    return `->resize(${split[0]}, ${split[1]})`;
  };

  this.sendKeys = function (cssPath, value) {
    return convertKey(cssPath, value);
  };
};

function convertKey (cssPath, key) {
  const keyConversion = {
    '{enter}': '${KEY_ENTER}'
  };

  let found = false;

  for (let i = 0; i < Object.keys(keyConversion).length; i += 1) {
    if (keyConversion[Object.keys(keyConversion)[i]] === key) {
      found = true;
      return `->keys("${cssPath}", "${Object.keys(keyConversion)[i]}")`;
    }

    if (i + 1 >= Object.keys(keyConversion).length && !found) {
      return "Couldn't find key";
    }
  }
}
