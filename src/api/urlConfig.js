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
}[Taro.getApp().env];