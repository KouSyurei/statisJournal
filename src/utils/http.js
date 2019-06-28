import axios from 'axios';
import {
  getToken
} from '@/utils/cookie.js'

// axios.defaults.withCredentials=true;//让ajax携带cookie
// Vue.prototype.$http = axios
axios.defaults.timeout = 500000;

// axios.defaults.baseURL ='http://172.16.87.47:8081'; // 徐行
// axios.defaults.baseURL ='http://192.168.254.110:8084';// 测试服务器
// axios.defaults.baseURL ='http://fillproject.dgg.net/';// 正式服务器
axios.defaults.baseURL ='https://dibossimsa.dgg.net/';// 测试服务器


// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    // debugger
    const token = getToken('FblockSession'); //获取Cookie
    console.log("=============== FblockSession："+token)
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部
    };
    if (token) {
      config.params = {'FblockSession': token} //后台接收的参数，后面我们将说明后台如何接收
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
//response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    if(response.data.errCode == 2) {
      router.push({
        path: '/login',
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  });

export default axios;


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     debugger
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
