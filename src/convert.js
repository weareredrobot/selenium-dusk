const Dusk = require('./commands/dusk');

const Convert = {
  result: '',

  convert (uploadsBasePath, commands, counter) {
    const converter = Dusk;
    this.result = [];

    return new Promise((resolve, reject) => {
      for (let i = 0; i < commands.length; i += 1) {
        const command = commands[i].command;

        if (command in converter && typeof converter[command] === 'function') {
          if (commands[i].targets.length > 0) {
            this.getCSSFinder(commands[i].targets, (cssPath) => {
              this.result.push(
                converter[command](cssPath, commands[i].value, commands[i].target, uploadsBasePath)
              );
            });
          } else {
            this.result.push(converter[command](commands[i].target));
          }
        }
      }

      const data = {
        assertions: this.result,
        counter
      };

      resolve(data);
    });
  },

  getCSSFinder (targets, callback) {
    let found = false;

    for (let i = 0; i < targets.length; i += 1) {
      if (targets[i][0].includes('css=')) {
        found = true;

        // Remove "css="
        callback(targets[i][0].substr(targets[i][0].indexOf('=') + 1));
      }

      if (i + 1 >= targets.length && !found) {
        callback();
      }
    }
  }
};

module.exports = Convert;
