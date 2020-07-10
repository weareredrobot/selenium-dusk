const slugify = require('slugify');
const camelCase = require('camelcase');

module.exports = {
  parseString: string => camelCase(slugify(string)),

  capitalizeWords: (string) => {
    let split = string.trim().split(' ');

    for (let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
    }

    return split.join('');
  },

  removeSpecialCharacters: string => string.replace(/[^\w\s]/gi, ''),
}