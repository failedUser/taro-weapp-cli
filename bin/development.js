const fs = require('fs');
const path = require('path');
require('shelljs/global');
const inquirer = require('inquirer');
const fileSys = require('./fileSystem');



let __srcname = path.resolve(__dirname, '..');
inquirer.prompt([{
    name: 'env',
    message: '请选择编译环境（choose build env）',
    type: 'list',
    default: 'dev',
    choices: ['dev', 'prepub', 'prod']
}])
.then(changeEnv)
.then(function () {
    var cmd = `npm run build:weapp -- --watch`;

    console.log();
    console.log('   $ ' + cmd);
    console.log();
    console.log('   building...');

    exec(cmd);
});


function changeEnv(answers) {
    let envPath = `${__srcname}/src/env.js`;
    const replaceEnv = function(res) {
        let match = /BUILD_ENV\s*\=\s*\'[a-z]*\'/;
        let newMatch = /BUILD_ENV\s*\=\s*\'/;
        let envStr = res.match(match)[0];
        let newEnvStr = `${res.match(newMatch)[0]}${answers.env}'`;
        res = res.replace(envStr, newEnvStr);
        fileSys.writeFile(envPath, res);
    }
    return fileSys.readfile(envPath)
        .then(replaceEnv)
}
