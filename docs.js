const ejs = require('ejs');
const files = require('./src/fileSystem');
const Dusk = require('./src/commands/dusk');

const docs = {};
const converter = Dusk;
let docsCounter = 0;
let docsMarkdown = '| Name | Description | Available |\n|---|---|---|\n';

files.read('./docs/Commands.ts', (data) => {

  data = data["data"];
  data = data.split('\n');

  for (let i = 0; i < data.length; i += 1) {
    data[i] = data[i].trim();

    if (data[i].indexOf('{') !== -1) {

      if (docsCounter > 3) {
        const command = data[i].split(':')[0];
        let name = data[i + 1].split(':')[1];
        let description = data[i + 2].split(':')[1];
        let available = '❌';

        while (data[i + 3].indexOf(':') === -1) {
          if (data[i + 3].indexOf('}') === -1) {
            description += data[i + 3].trim();
          }
          i += 1;
        }

        description = description.replace(/[,`]/g, '');
        name = name.replace(/[,']/g, '').trim();

        if (command in converter && typeof converter[command] === 'function') {
          available = '✅';
        }

        docs[command] = {
          name,
          description,
          available
        };

        docsMarkdown += `|${name}|${description}|${available}|\n`;

      } else {
        docsCounter += 1;
      }
    }
  }

  const toJSON = JSON.stringify(docs);

  files.write('./docs/commands.json', toJSON, () => {
    console.log('commands.json generated.');
  });

  files.write('./docs/commands.md', docsMarkdown, () => {
    console.log('commands.md generated.');
  });

  files.read('./docs/main.md', (data) => {

    const result = ejs.render(data.data, {
      commands: docsMarkdown
    });

    files.write('./README.md', result, () => {
      console.log('README.me generated.');
    });
  });
});
