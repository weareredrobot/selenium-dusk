const assert = require('assert');
const Dusk = require('../src/commands/dusk');
const { exec } = require("child_process");

const commands = {
  click: {
    cssPath: '.mb-3',
    value: '',
    target: 'linkText=Register',
    return: '->assertPresent(".mb-3")->click(".mb-3")'
  },
  open: {
    cssPath: '',
    value: '',
    target: '/',
    return: '->visit("/")'
  },
  setWindowSize: {
    cssPath: '',
    value: '1920x1057',
    target: '1920x1057',
    return: '->resize(1920, 1057)'
  },
  type: {
    cssPath: '#email',
    value: 'admin@example.com',
    target: 'id=email',
    return: '->type("#email","admin@example.com")'
  },
  sendKeys: {
    cssPath: '#Password',
    value: '${KEY_ENTER}',
    target: 'id=Password',
    return: '->keys("#Password","{enter}")'
  },
  select: {
    cssPath: '',
    value: 'label=Less than 10 employees',
    target: 'id=test',
    return: '->select("#test", "Less than 10 employees")'
  },
  mouseDownAt: {
    cssPath: '#test',
    value: '-702,-315.15625',
    target: 'id=test',
    return: '->mouseover("#test")->clickAndHold()'
  },
  mouseMoveAt: {
    cssPath: '#test',
    value: '-702,-315.15625',
    target: 'id=test',
    return: '->mouseover("#test")'
  },
  mouseUpAt: {
    cssPath: '#test',
    value: '-702,-315.15625',
    target: 'id=test',
    return: '->mouseover("#test")->releaseMouse()'
  }
}

describe('Commands', function () {

  describe('#commands', function () {
    it('Should pass if all commands return the right strings', function () {
      for (let i = 0; i < Object.keys(commands).length; i += 1) {
        const key = Object.keys(commands)[i];

        if (commands[key].cssPath != '') {
          assert.equal(Dusk[key](commands[key].cssPath, commands[key].value, commands[key].target, './'), commands[key].return)
        } else {
          assert.equal(Dusk[key](commands[key].target, commands[key].value), commands[key].return);
        }
      }
    });
  });

  describe('#generate_php', function () {
    it('Should pass if generated php file has correct syntax', function () {
      exec("node index ./test/side/test.side -o ./test/php/", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        assert.equal(stdout, `File is ready at ./test/php/TestTest.php\n`);
        exec("php -l ./test/php/TestTest.php", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          assert.equal(stdout, `No syntax errors detected in ./src/php/TestTest.php\n`);
        });
      });
    });
  });
  
});
