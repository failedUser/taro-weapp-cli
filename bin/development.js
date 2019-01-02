const fs = require('fs');
const path = require('path');
require('shelljs/global');
const inquirer = require('inquirer');
const fileSys = require('./fileSystem');



let __srcname = path.resolve(__dirname, '..');
inquirer.prompt([
{
    name: 'env',
    message: '请选择编译环境（choose build env）',
    type: 'list',
    default: 'dev',
    choices: ['dev', 'prepub', 'prod']
},
{
    name: 'group',
    message: '请选择要编译的集团( choose build group）',
    type: 'list',
    default: 'dev',
    choices: getGroupsDir()
},
])
.then(changeEnv)
.then(changeUrlConfig)
.then(function () {
    var cmd = `npm run build:weapp -- --watch`;

    console.log();
    console.log('   $ ' + cmd);
    console.log();
    console.log('   building...');

    exec(cmd);
});


/**
 * 修改项目执行环境变量
 * @param {} answers 
 */
function changeEnv(answers) {
    let envPath = `${__srcname}/src/env.js`;
    const replaceEnv = function(res) {
        let match = /BUILD_ENV\s*\=\s*\'[a-z]*\'/;
        let newMatch = /BUILD_ENV\s*\=\s*\'/;
        let envStr = res.match(match)[0];
        let newEnvStr = `${res.match(newMatch)[0]}${answers.env}'`;
        res = res.replace(envStr, newEnvStr);
        return fileSys.writeFile(envPath, res).then(() => answers);
    }
    return fileSys.readfile(envPath)
        .then(replaceEnv)
}

function changeUrlConfig(answers) {
    let url = `${__srcname}/groups/${answers.group}/urlConfig.js`;
    let writeUrl = `${__srcname}/src/api/urlConfig.js`;
    const setNewConfig = function(str) {
       return fileSys.writeFile(writeUrl, str).then(() => answers);
    }
    return fileSys.readfile(url)
    .then(setNewConfig)
    .catch(e => {
        console.error('\n无法正确访问到', `${__srcname}/groups/${answers.group}/urlConfig.js`, '请检查group下面的配置文件\n');
        return Promise.reject(e);
    });
}

function getGroupsDir() {
    return fs.readdirSync(`${__srcname}/groups`);
}