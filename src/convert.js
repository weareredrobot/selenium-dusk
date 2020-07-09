const Dusk = require('./commands/dusk');

let Convert = {
    result: '',

    convert (uploadsBasePath, commands, counter) {
        const converter = new Dusk();
        this.result = '';

        return new Promise((resolve, reject) => {
            for(let i = 0; i < commands.length; i++) {
                const command = commands[i].command;

                if(command in converter && typeof converter[command] == 'function') {
                    if(commands[i].targets.length > 0) {
                        this.getCSSFinder(commands[i].targets, (cssPath) => {
                            this.result += converter[command](cssPath, commands[i].value, commands[i].target, uploadsBasePath);
                        });
                    } else {
                      this.result += converter[command](commands[i].target);
                    }
                }
            }

            const data = {
                function: this.result,
                counter
            };

            resolve(data);
        })
    },

    getCSSFinder(targets, callback) {
        var found = false;
    
        for(var i = 0; i < targets.length; i++) {
            if(targets[i][0].includes("css=")) {
                found = true;
    
                //Remove "css="
                callback(targets[i][0].substr(targets[i][0].indexOf("=") + 1));
            }
    
            if(i + 1 >= targets.length && !found) {
                callback("");
            }
        }
    }
}

module.exports = Convert;