import axios from 'axios';
import {
  Message
} from 'element-ui';
import isApp from '../main'

axios.defaults.timeout = 50000;

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = 'https://develop-gateway.bicai365.com/';
  // axios.defaults.baseURL = 'http://gateway.bicai365.com/';
} else if (process.env.NODE_ENV === "demo") {
  axios.defaults.baseURL = 'https://gatewaydemo.bicai365.com/';
} else if (process.env.NODE_ENV === "release") {
  axios.defaults.baseURL = 'https://gateway.bicai365.com/';
} else if (process.env.NODE_ENV === "dev") {
  axios.defaults.baseURL = 'https://develop-gateway.bicai365.com/';
}

// axios.defaults.baseURL ='https://yiye-gateway-test4.bicai365.com'

// axios.defaults.baseURL ='http://gateway.bicai365.com/';

//创建一个错误
function errorCreat(msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog(err) {
  // 显示提示
  Message({
    message: err.message + '试试刷新页面！',
    type: 'error',
    duration: 5 * 1000
  })
}
// 请求设置
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token,
    }
  } else {
    config.headers = {
      'Authorization': 'Basic YmljYWk6QmljYWkzNjU=',
      'Content-Type': 'application/x-www-form-urlencoded'
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
      let token = localStorage.getItem('token');
      if (token && dataAxios.code !== "B_INVALID_TOKEN") {
        // 如果token无效，则跳转到登录页
        Message({
          message: `${dataAxios.message}！`,
          type: 'error',
          duration: 2 * 1000
        });

      } else {
        setTimeout(() => {
          isApp.$router.push({
            name: 'login'
          })
        }, 1000)
        Message({
          message: `${dataAxios.message}`,
          type: 'warning',
          duration: 3 * 1000
        })
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
    errorCreat(error)
    return Promise.reject(error)
  }
)

export default axios