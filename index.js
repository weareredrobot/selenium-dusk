const ejs = require('ejs');
const files = require('./src/fileSystem');
const convert = require('./src/convert');
const helpers = require('./src/utils/helpers');

const templateArrayFunctionFile = [];
let counter = 0;

require('yargs')
    .command('$0 [path]', 'Convert Selenium test to Dusk test', (yargs) => {
        yargs
            .positional('path', {
                describe: 'Path to Selenium test',
                default: ''
            })
            .option('output', {
                alias: 'o',
                type: 'string',
                default: '/',
                description: 'Output path of Dusk tests'
            })
            .option('uploadsBasePath', {
                alias: 'u',
                type: 'string',
                default: '',
                description: 'Set the path where you want to upload files from'
            })
    }, (argv) =>
    {
        var input = argv.path;
        var output = argv.output;
        var uploadsBasePath = argv.uploadsBasePath;

        files.read(input, function(data){
            if(data["err"]){
                console.log("Error reading the file (possibly wrong input)")
            }
            else{
                var seleniumFile = JSON.parse(data["data"]);

                files.read('./src/templates/template.txt', function(data){
                    var templateFile = data.data;

                    files.read('./src/templates/templateFunction.txt', function(data){
                        var templateFunctionFile = data.data;

                        for(var i = 0; i < seleniumFile.tests.length; i++){
                            convert.convert(uploadsBasePath, seleniumFile.tests[i].commands, i)
                            .then(function (data) {
                              //Clear spaces if there are any
                              var functionName = helpers.removeSpecialCharacters(seleniumFile.tests[data["counter"]].name);
                              functionName = helpers.phpTestCaseName(functionName);

                              var result = ejs.render(templateFunctionFile, {
                                'name': functionName,
                                'assertions': data["assertions"],
                              })

                              templateArrayFunctionFile.push(result);
                            })
                            .then(function(){
                                counter++;

                                if(counter >= seleniumFile.tests.length){

                                  var fileName = helpers.removeSpecialCharacters(`/${seleniumFile.name} Test`);
                                  fileName = helpers.capitalizeWords(fileName);

                                  var result = ejs.render(templateFile, {
                                    'method': templateArrayFunctionFile,
                                    'testClassName' : fileName,
                                  })

                                  files.write(output + fileName + '.php', result, function(status){
                                      if(status){
                                          console.log("Finished.");
                                      } else {
                                          console.log("Failed.");
                                      }
                                  })
                                }
                            })
                            .catch(function (data) {
                              console.log(`${data.err} Skipping ${seleniumFile.tests[data.counter].name}`);
                            })
                        }
                    });
                });
            }
        })
    })
    .argv