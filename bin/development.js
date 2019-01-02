const fs = require('fs');
const path = require('path');
require('shelljs/global');
const inquirer = require('inquirer');
let __srcname = path.resolve(__dirname, '..');
inquirer.prompt([{
    name: 'env',
    message: '请选择编译环境（choose build env）',
    type: 'list',
    default: 'dev',
    choices: ['dev', 'prepub', 'prod']
}]).then(function (answers) {
    var cmd = `npm run build:weapp -- --watch`;

    console.log();
    console.log('   $ ' + cmd);
    console.log();
    console.log('   building...');

    exec(cmd);
});
// fs.readFile(__srcname + '/src/env.js', (err, data) => {
//     if (err) {
//         console.log('获取环境文件失败');
//         return false;
//     }
//     let str = data.toString();
//     str = str.replace('dev', env);
//     fs.writeFile(__srcname + '/src/env.js', str, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//         exec('npm run build:weapp -- --watch');
//     });
   
// });
