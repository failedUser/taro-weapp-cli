const Taro = require('@tarojs/taro');
const BUILD_ENV = 'prepub';
/**
 * 挂在全局实例属性
 * 相当于小程序的getApp();
 */
module.exports = function () {
    let __app__ = this.$app;
    __app__.env = BUILD_ENV;
}