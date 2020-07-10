const ejs = require('ejs');
const files = require('./src/fileSystem');
const convert = require('./src/convert');

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
                console.log("Received input file");

                var seleniumFile = JSON.parse(data["data"]);

                files.read('./src/templates/template.txt', function(data){
                    var templateFile = data.data;

                    files.read('./src/templates/templateFunction.txt', function(data){
                        var templateFunctionFile = data.data;

                        for(var i = 0; i < seleniumFile.tests.length; i++){
                            convert.convert(uploadsBasePath, seleniumFile.tests[i].commands, i)
                            .then(function(data){
                                var tempTemplateFunctionFile = templateFunctionFile;

                                //Clear spaces if there are any
                                var functionName = seleniumFile.tests[data["counter"]].name.replace(" ", "");

                                var result = ejs.render(templateFunctionFile, {
                                  'name': functionName,
                                  'assertions': data["assertions"],
                                })

                                templateArrayFunctionFile.push(result);
                            })
                            .then(function(){
                                console.log(templateArrayFunctionFile)
                                counter++;

                                if(counter >= seleniumFile.tests.length){

                                    var result = ejs.render(templateFile, {
                                      'method': templateArrayFunctionFile,
                                      'testClassName' : seleniumFile.name,
                                    })

                                    files.write(output + "/" + seleniumFile.name + ".php", result, function(status){
                                        if(status){
                                            console.log("Test converted");
                                        } else {
                                            console.log("Failed to convert test");
                                        }
                                    })
                                }    
                            })
                        }
                    });
                });
            }
        })
    })
    .argv