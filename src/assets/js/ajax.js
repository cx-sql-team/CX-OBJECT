import axios from 'axios'
import { MessageBox } from 'element-ui';

const AXIOS_URL = 'http://10.130.161.109:8080/';

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if(err.toString().indexOf('timeout') > -1) {
        var config = err.config;
        if(!config || !config.retry) return Promise.reject(err);
        config.__retryCount = config.__retryCount || 0;
        if(config.__retryCount >= config.retry) {
            return Promise.reject(err);
        }
        config.__retryCount += 1;
        var backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, config.retryDelay || 1);
        });
        return backoff.then(function() {
            return axios(config);
        });
    }
    else {
        if(err.response.status === 401) {
            if(err.response.data.errorCode === 2001) {
                localStorage.setItem('jwt', err.response.data.data)
                let originalRequest = err.config;
                let token = localStorage.getItem("jwt");
                originalRequest.headers.Authorization = token;
                originalRequest.headers['Local-Date'] = putDate(dateFormat('yyyy-MM-dd hh:mm:ss'));
                axios.request(originalRequest)
                return Promise.resolve(axios.request(originalRequest))
            }
            if(err.response.data.errorCode === 4011) {
                MessageBox.alert(' Your Signature error, please log on again！', 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                }).then(() => {
                    router.replace({path: '/login'})
                })
                return Promise.reject();
            }
            if(err.response.data.errorCode === 4013) {
                MessageBox.alert(' Your session has time out, please log on again！', 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                }).then(() => {
                    router.replace({path: '/login'})
                })
                return Promise.reject();
            }
            else {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(err);
        }
    }
});

axios.interceptors.response.use(function (response) {
    // console.log('response',response)
    // 用户信息是否超时，重定向到登录页面
    // if (){
    //     localStorage.clear()
    //     router.replace({
    //       path: '/login',
    //       query: {redirect: router.currentRoute.fullPath}
    //     })
    // }
    return response
}, function (error) {
    return Promise.reject(error)
})



// 添加请求拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = token;
    }
    config.headers['Local-Date'] = putDate(dateFormat('yyyy-MM-dd hh:mm:ss'));
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});




const axiosPostFormat = (obj) => {
    if(Array.isArray(obj)) {
        return obj
    }
    else {
        let res = {}
        for(let i in obj) {
            if(obj[i] === undefined) {
                res[i] = ''
            }
            else {
                res[i] = obj[i]
            }
        }
        return res
    }
}

const axiosGetFormat = (obj, url) => {
    if(typeof obj === 'number' || typeof obj === 'string') {
        return obj
    }
    if(Object.keys(obj).length === 1) {
        return obj[Object.keys(obj)[0]]
    }
    if(url.indexOf('mdm-api') > -1 && obj['pageNo'] && obj['pageNo']!== '' && obj['pageSize']!== '' && Object.keys(obj).length === 3 && url.indexOf('query') === -1) {
        let res = ''
        for(let i in obj) {
            if(i!== 'pageNo' && i!== 'pageSize') {
                res = obj[i]
            }
        }
        return `${res}?pageNo=${obj['pageNo']}&pageSize=${obj['pageSize']}`
    }
    let res = ''
    for(let i in obj) {
        if(obj[i]!== '' && obj[i]!== null) {
            res += '&' + i + '=' + obj[i]
        }
    }
    return '?' + res.substring(1)
}


const axiosType = (url, data, type) => {
    switch (type) {
        case 'post':
            return axios.post(url, axiosPostFormat(data));
            break;
        case 'get':
            return axios.get(url + axiosGetFormat(data, url));
            break;
        case 'delete':
            return axios.delete(url + axiosGetFormat(data, url));
            break;
        case 'put':
            return axios.put(url, axiosPostFormat(data));
            break;
    }
}





//AXIOS
const goSysAxios  = (url,data={}, type='post', noErrorMeg) => {
    return new Promise((res, rej) =>{
        // axiosType(((process.env.NODE_ENV==='development' ? '/api' : 'http://10.130.161.109:8080/mdm-api') +  url), data, type)
        axiosType((getServerUrl +  url), data, type)
        .then((response) => axiosRes(response, 3000,res, rej, 2000, noErrorMeg))
        .catch((err) => {
            rej(err)
            if(err && err.toString().indexOf('timeout') > -1) {
                if(!noErrorMeg) {
                    MessageBox.alert('Time out，Please do it later！', 'Warning', {
                        type: 'error',
                        confirmButtonText: 'Yes',
                    });
                }
            }
            else if(err && err.response.data.message) {
                MessageBox.alert(err.response.data.message, 'Warning', {
                    type: "error",
                    confirmButtonText: "Yes",
                });
            }
            else if(err && err.response) {
                MessageBox.alert(err.response.data.errorMsg + (err.response.data.errorCode !== 4011 && err.response.data.errorCode !== 4013 ? ',please contact the System Admin！' : ''), 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                    callback: action => {
                        if (err.response.data.errorCode === 4011 || err.response.data.errorCode === 4013) {
                            window.location.href = "/dcs";
                        }
                    },
                });
            }
        });
    });
};

export default goSysAxios;
