import Taro from '@tarojs/taro';
export default {
    'dev': {
        AMGUID: 'https://amguid.yf.dasouche.net',
        GAODE_MAP: 'https://restapi.amap.com',
        BURY: 'https://data-report.yf.dasouche.net'

    },
    'prod': {
        AMGUID: 'https://amguid.dongfenginfiniti.com.cn',
        GAODE_MAP: 'https://restapi.amap.com',
        BURY: 'https://report-retail.dongfenginfiniti.com.cn'
    }
}[Taro.getApp().env]; //小程序的环境当中全局实例是app 没有process的概念，taro不会吧process挂在在app当中，所以实例上的属性还要自己手动赋值