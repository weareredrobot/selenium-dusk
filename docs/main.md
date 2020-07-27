##  sDusk

This tool is a beta software that works for our intended purposes. Issues and pull requests are welcome!

Convert Selenium tests to Dusk tests with a simple CLI.

Run `index [path] -o [outputPath]` to generate a Dusk test.

**Positionals**
|Name|Description|Default|
|--|--|--|
|path|Path to Selenium test|null|


**Arguments**

|Options|Description|Type
|--|--|--|
|--help|Show help| Boolean
|--version|Show version number| Boolean
|--output or -o| Output path of Dusk tests | String - Default:"/"
|--uploadsBasePath or -u| Set the path where you want to upload files from| String - Default: Directory from Selenium test

**Commands available**
<%- commands %>