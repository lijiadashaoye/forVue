import axios from 'axios';
import {
  Message
} from 'element-ui';
import isApp from '../main'

axios.defaults.timeout = 50000;

let baseURL = '';
if (process.env.NODE_ENV === "development") {
  baseURL = 'https://develop-gateway.bicai365.com/';
} else if (process.env.NODE_ENV === "demo") {
  baseURL = 'https://gatewaydemo.bicai365.com/';
} else if (process.env.NODE_ENV === "release") {
  baseURL = 'https://gateway.bicai365.com/';
} else if (process.env.NODE_ENV === "dev") {
  baseURL = 'https://develop-gateway.bicai365.com/';
} else if (process.env.NODE_ENV === "inner") {
  baseURL = 'http://gateway.bicai365.com/';
} else if (process.env.NODE_ENV === "auto") {
  baseURL = 'https://auto-gateway.bicai365.com/';
}
axios.defaults.baseURL = baseURL;

// 下载模版需要使用
export const BaseUrl = baseURL;

let timeOut = null;

// 记录和显示错误
function errorLog(error) {
  if (!timeOut) {
    timeOut = setTimeout(() => {
      // 显示提示
      Message({
        message: error.message + '!',
        type: 'error',
        duration: 5 * 1000
      })
      timeOut = null;
    }, 50)
  }
}
const clientParams = {
  language: 'zh_CN',
  platformCode: 'manager'
}
// 请求设置
axios.interceptors.request.use(config => {
  let token = sessionStorage.getItem('token');
  if (token) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token,
      'clientParams': JSON.stringify(clientParams)
    }
  } else {
    config.headers = {
      'Authorization': 'Basic YmljYWk6QmljYWkzNjU=',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clientParams': JSON.stringify(clientParams)
    }
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    if (dataAxios.success) { // 页面请求的
      return dataAxios;
    } else
    if (dataAxios.access_token) { // 登录的
      return dataAxios;
    } else
    if (dataAxios instanceof ArrayBuffer || dataAxios instanceof Blob) { // 图片上传的
      return dataAxios
    } else {
      errorLog(dataAxios)
      let token = sessionStorage.getItem('token');
      if (!token || dataAxios.code === "B_INVALID_TOKEN") {
        setTimeout(() => {
          isApp.$router.push({
            name: 'login'
          })
        }, 1000)
      }
      return null
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误';
          break
        case 401:
          error.message = '未授权，请登录';
          break
        case 403:
          error.message = '拒绝访问';
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break
        case 408:
          error.message = '请求超时';
          break
        case 500:
          error.message = '服务器内部错误';
          break
        case 501:
          error.message = '服务未实现';
          break
        case 502:
          error.message = '网关错误';
          break
        case 503:
          error.message = '服务不可用';
          break
        case 504:
          error.message = '网关超时';
          break
        case 505:
          error.message = 'HTTP版本不受支持';
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default axios