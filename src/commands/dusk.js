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

  sendKeys: (cssPath, value) => convertKey(cssPath, value),

  select: (target, value) => {
    const label = value.split('=')[1];
    let id = `#${target.split('=')[1]}`;
    id = id.replace(/[-[\]\\';,./{}|":<>?~]/g, '\\$&');
    return `->select("${id}", "${label}")`;
  },

  mouseDownAt: cssPath => `->mouseover("${cssPath}")->clickAndHold()`,

  mouseMoveAt: cssPath => `->mouseover("${cssPath}")`,

  mouseUpAt: cssPath => `->mouseover("${cssPath}")->releaseMouse()`
};

function convertKey (cssPath, value) {
  const keyConversion = {
    '{enter}': '${KEY_ENTER}'
  };

  if (Object.values(keyConversion).indexOf(value) !== -1) {
    return `->keys("${cssPath}","${Object.keys(keyConversion).find(key => keyConversion[key] === value)}")`;
  }

  return false;
}
