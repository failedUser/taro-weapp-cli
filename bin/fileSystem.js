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
    writeFile: function(path, str, cb) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, str, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}