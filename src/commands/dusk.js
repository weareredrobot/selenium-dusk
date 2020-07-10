const path = require('path');

module.exports = {

  click: cssPath => `->assertPresent("${cssPath}")->click("${cssPath}")`,

  open: target => `->visit("${target}")`,

  type: (cssPath, value, target, uploadsBasePath) => {
    let uploadBasePath = value;

    if (value !== path.basename(value) && uploadsBasePath !== '') {
      const split = value.split('/');
      uploadBasePath = uploadsBasePath + split[split.length - 1];
    }

    return `->type("${cssPath}","${uploadBasePath}")`;
  },

  setWindowSize: (value) => {
    const split = value.split('x');
    return `->resize(${split[0]}, ${split[1]})`;
  },

  sendKeys: (cssPath, value) => convertKey(cssPath, value)
};

function convertKey (cssPath, key) {
  const keyConversion = {
    '{enter}': '${KEY_ENTER}'
  };

  const keys = Object.keys(keyConversion);

  keys.forEach((value, index) => {
    if (key === value) {
      return `->keys("${cssPath}", "${keys[index]}")`;
    }
  });

  return false;
}
