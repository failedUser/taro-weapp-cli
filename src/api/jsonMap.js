import urlConfig from './urlConfig';
let { GAODE_MAP } = urlConfig;

export default {
    'GET': {
        'getTest': '/api/dictionaryApi/queryAllCities.json',
        'getTest2': {
            url: GAODE_MAP,
            json: '/api/dictionaryApi/queryAllCities.json'
        }
    },
    'POST': {
        'postTest': '/api/dictionaryApi/queryAllCities.json',
        'postTest2': {
            url: GAODE_MAP,
            json: '/api/dictionaryApi/queryAllCities.json'
        }

    }
}