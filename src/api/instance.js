import Taro from '@tarojs/taro'
import urlConfig from './urlConfig';
import jsonMap from './jsonMap';

var defaultDomain = urlConfig.AMGUID;
const expirdTime = 60 * 60 * 1000;
const ApiList = computedUrl();
var unUseTokenList = []; //有些接口可能不需要token
var requestQueue = [];
var getTokenStatus = '';
var apiStatusMap = {};

const httpRequest = function(action, data) {
    let baseConfig = ApiList[action];
    if (!baseConfig) {
        console.error('此接口不存在', action);
        return false;
    }
    if (apiStatusMap[action] === 'pending') {
        console.log('请勿多次提交请求', action);
        return false;
    }
    apiStatusMap[action] = 'pending';
    if (unUseTokenList.indexOf(action) >= 0) {
        return request(baseConfig, data);
    }
    return new Promise(function(resolve, reject) {
        const __request = function () {
            return request(baseConfig, data).then(resolve).catch(reject);
        }
        if (getTokenStatus === 'pending') { //如果正在获取token。那么放入请求队列当中，等token有了再说
            let wait = setInterval(() => {
                if (getTokenStatus === 'success') {
                    clearInterval(wait);
                    __request();
                }
            }, 500);
        } else {
            if (checkToken()) {
                __request();
            } else {
                getToken().then(__request).catch(reject);
            }
        }
    });
}

function getToken() {
    getTokenStatus = 'pending';
    return new Promise((resolve, reject) => {
        Taro.login({
            success: function (res) {
                setTimeout(function () {
                    Taro.setStorageSync('token_end_ts', Date.parse(new Date()) + expirdTime);
                    Taro.setStorageSync('token', 'testToken');
                    getTokenStatus = 'success';
                    resolve();
                }, 3000);
            },
            fail: function (e) {
                Taro.showToast({ title: '微信登录失败, 请检查网络退出重试', icon: 'none' });
                getTokenStatus = 'error';
                
                reject();
            }
        });
    });
}
function checkToken() {
    let token = Taro.getStorageSync('token');
    let token_end_ts = Taro.getStorageSync('token_end_ts');
    let current_ts = Date.parse(new Date());
    if (
        !token ||
        current_ts > token_end_ts //过期了
    ) {
        Taro.clearStorageSync('token');
        Taro.clearStorageSync('token_end_ts');
        return false;
    }
    return true;
}

const request = (config, data) => {
    if (config.method == 'POST') {
        config.header = {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }
    config.data = data || {};
    config.data.tokenId = wx.getStorageSync('token') || '';
    return new Promise((resolve, reject) => {
        wx.request(Object.assign(config, {
            success: (res) => {
                wx.stopPullDownRefresh();
                if (res.statusCode == 200) {
                    let data = res.data;
                    data.success ? resolve(data.data) : reject(data.msg);
                } else {
                    let msg = '接口异常, 请检查重试';
                    reject(msg);
                }

            },
            fail: (e) => {
                Taro.showToast({ title: '发送请求失败，请检查网络', icon: 'none' });
                reject(e);
            }
        }));
    });
}


export default httpRequest;


function parseObjUrl(el) {
    if (typeof el !== 'object') {
        console.error('接口配置失败，请检查配置格式');
        return false;
    }
    let { url, json } = el;
    return `${url}${json}`;
}
function parseStrUrl(str) {
    if (str.indexOf('http://') >= 0 || str.indexOf('https://') >= 0) {
        return str;
    } else if (str.indexOf('//') >= 0) {
        return str.replace('//', 'https://');
    } else {
        return `${defaultDomain}${str}`;
    }
}
function parseUrl(obj, type) {
    let result = {};
    for (let key in obj) {
        let u = obj[key];
        result[key] = {
            url: typeof u === 'string' ? parseStrUrl(u) : parseObjUrl(u),
            method: type
        }
    }
    return result;
}
function computedUrl() {
    let result = {};
    Object.keys(jsonMap).forEach(key => {
        Object.assign(result, parseUrl(jsonMap[key], key));
    });
    return result;
}