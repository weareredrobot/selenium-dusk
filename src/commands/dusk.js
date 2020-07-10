const path = require('path');

module.exports = {

  click: cssPath => `->assertPresent("${cssPath}")->click("${cssPath}")\n`,

  open: target => `->visit("${target}")\n`,

  type: (cssPath, value, target, uploadsBasePath) => {
    let uploadBasePath = value;

    if (value !== path.basename(value) && uploadsBasePath !== '') {
      const split = value.split('/');
      uploadBasePath = uploadsBasePath + split[split.length - 1];
    }

    return `->type("${cssPath}","${uploadBasePath}")\n`;
  },

  setWindowSize: (value) => {
    const split = value.split('x');
    return `->resize(${split[0]}, ${split[1]})\n`;
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
      return `->keys("${cssPath}", "${keys[index]}")\n`;
    }
  });

  return false;
}
