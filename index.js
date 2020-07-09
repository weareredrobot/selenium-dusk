const   files = require("./src/fileSystem"),
        convert = require('./src/convert'),
        Handlebars = require('handlebars');
        

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

                Handlebars.registerPartial('assertion', '{{{assertion}}}');
                Handlebars.registerPartial('method', '{{{method}}}');

                var seleniumFile = JSON.parse(data["data"]);

                files.read('./src/templates/template.txt', function(data){
                    var templateFile = Handlebars.compile(data.data);

                    files.read('./src/templates/templateFunction.txt', function(data){
                        var templateFunctionFile = Handlebars.compile(data.data);
                        for(var i = 0; i < seleniumFile.tests.length; i++){
                            convert.convert(uploadsBasePath, seleniumFile.tests[i].commands, i)
                            .then(function(data){
                                var tempTemplateFunctionFile = templateFunctionFile;

                                //Clear spaces if there are any
                                var functionName = seleniumFile.tests[data["counter"]].name.replace(" ", "");

                                data["assertions"][data["assertions"].length - 1] = data["assertions"][data["assertions"].length - 1].substring(0, data["assertions"][data["assertions"].length - 1].length - 1);
                                data["assertions"][data["assertions"].length - 1] += ";\n";

                                var data = {
                                    'name': functionName,
                                    'assertion': data["assertions"],
                                }

                                tempTemplateFunctionFile = tempTemplateFunctionFile(data).replace(/,->/g, "->");
                                templateArrayFunctionFile.push(tempTemplateFunctionFile);
                            })
                            .then(function(){
                                counter++;

                                if(counter >= seleniumFile.tests.length){
                                    var data = {
                                        'method': templateArrayFunctionFile,
                                        'testClassName': seleniumFile.name
                                    }

                                    templateFile = templateFile(data).replace(/,public/g, "public");

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