const   files = require("./src/fileSystem"),
        convert = require('./src/convert');

var seleniumFile, templateFile, templateFunctionFile, templateArrayFunctionFile = [], counter = 0;

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
    }, (argv) => 
    {
        var input = argv.path;
        var output = argv.output;

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
                            convert.commands(seleniumFile.tests[i].commands, i)
                            .then(function(data){
                                var tempTemplateFunctionFile = templateFunctionFile;
                                var functionName = seleniumFile.tests[data["counter"]].name.replace(" ", "");

                                tempTemplateFunctionFile = tempTemplateFunctionFile.replace("{{name}}", functionName);
                                tempTemplateFunctionFile = tempTemplateFunctionFile.replace("{{function}}", data["function"]);

                                templateArrayFunctionFile.push(tempTemplateFunctionFile);
                            })
                            .then(function(){
                                counter++;

                                if(counter >= seleniumFile.tests.length){
                                    templateFile = templateFile.replace("{{method}}", templateArrayFunctionFile.join(''));
                                    templateFile = templateFile.replace("{{testClassName}}", seleniumFile.name)

                                    files.write(output + "/" + seleniumFile.name + ".php", templateFile, function(status){
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