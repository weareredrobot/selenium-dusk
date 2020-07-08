const files = require("./src/fileSystem");

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

                files.read('./template.txt', function(data){
                        var template = data.data;
                });

                for(var i = 0; i < seleniumFile.tests.length; i++){
                    console.log(seleniumFile.tests[i].name);

                    files.read('./templateFunction.txt', function(data){
                        var template = data.data;
                        template = template.replace("{{name}}", "test");
                        console.log(template);
                    })
                }
            }
        })

        
    })
    .argv