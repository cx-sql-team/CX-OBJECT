import Axios, {AxiosResponse} from 'axios';
import router from '../router/router';
import { MessageBox } from 'element-ui';

Axios.interceptors.response.use(undefined, (err: any) => {
    if (err.toString().indexOf('timeout') > -1) {
        const config = err.config;
        if (!config || !config.retry) {
            return Promise.reject(err);
        }
        config.__retryCount = config.__retryCount || 0;
        if (config.__retryCount >= config.retry) {
            return Promise.reject(err);
        }
        config.__retryCount += 1;
        const backoff = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1);
        });
        return backoff.then(() => {
            return Axios(config);
        });
    } else {
        if (err.response.status === 401) {
            if (err.response.data.errorCode === 2001) {
                localStorage.setItem('jwt', err.response.data.data);
                const originalRequest = err.config;
                const token = localStorage.getItem('jwt');
                originalRequest.headers.Authorization = token;
                originalRequest.headers['Local-Date'] = '2019-03-29T14:37:31.000+0800';
                Axios.request(originalRequest);
                return Promise.resolve(Axios.request(originalRequest));
            }
            if (err.response.data.errorCode === 4011) {
                MessageBox.alert(' Your Signature error, please log on again！', 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                }).then(() => {
                    router.replace({path: '/login'});
                });
                return Promise.reject();
            }
            if (err.response.data.errorCode === 4013) {
                MessageBox.alert(' Your session has time out, please log on again！', 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                }).then(() => {
                    router.replace({path: '/login'});
                });
                return Promise.reject();
            } else {
                return Promise.reject(err);
            }
        } else {
            return Promise.reject(err);
        }
    }
});


// 添加请求拦截器
// Add a request interceptor
Axios.interceptors.request.use((config: any) => {
    // Do something before request is sent
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = token;
    }
    config.headers['Local-Date'] = '2019-03-29T14:37:31.000+0800';
    return config;
},  (error: any) => {
    // Do something with request error
    return Promise.reject(error);
});

interface OptsType {
    url: string;
    method: 'post' | 'get';
    params: {};
}



// 回调res.data的接口
const resDataUrl: string[] = ['auth/login'];


const ajax = (opts: OptsType) => {
    const method = opts.method ? opts.method : 'post';
    const httpDefaultOpts = { // http默认配置
        method,
        baseURL: '/api/',  // 测试
        url: opts.url,
        timeout: 100000,
        params: opts.params,
        data: opts.params,
        headers: method === 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
            'systoken': '',
        } : {
            'Content-Type': 'application/json;charset=UTF-8',
            'systoken': '',
        },
    };
    if (method === 'get') {
        delete httpDefaultOpts.data;
    } else {
        delete httpDefaultOpts.params;
    }
    console.info('%c ' + 'request:' + opts.url, 'font-weight:bold;color:green;', opts.params);
    const promise = new Promise((resolve, reject) => {
        Axios(httpDefaultOpts).then(
            (res: AxiosResponse) => {
                if (res.data.success) {
                    resolve(resDataUrl.includes(opts.url) ? res.data : res.data.data);
                } else {
                    MessageBox.alert(res.data.errorMsg, 'Warning', {
                        type: 'error',
                        confirmButtonText: 'Yes',
                    });
                    reject(res.data);
                }
            },
        ).catch(
            (response) => {
                MessageBox.alert(response.data.errorMsg, 'Warning', {
                    type: 'error',
                    confirmButtonText: 'Yes',
                });
                reject(response.data);
            },
        );
    });
    return promise;
};



export default ajax;

