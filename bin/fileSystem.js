const fs = require('fs');
// const promise = require('promise');

module.exports = {
    readfile: function(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    console.log('获取环境文件失败', err);
                    reject(err);
                    return false;
                }
                resolve(data.toString());
            });
        })

    },
    writeFile: function(path, str) {
        return new Promise((resolve, reject) => {
            if (!str || typeof str !== 'string') {
                reject('读取文件的格式不对');
                return false;
            }
            fs.writeFile(path, str, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}