const Taro = require('@tarojs/taro');
const BUILD_ENV = 'prepub';

module.exports = function () {
    let __app__ = this.$app;
    __app__.env = BUILD_ENV;
}