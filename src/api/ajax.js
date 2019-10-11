import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
//添加请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const {method,data}=config
    if (method.toLowerCase() === 'post'&& typeof data ==='object') {
        // config.data=qs.stringify(data)
    }
    return config;
  });
  // 返回数据响应器
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    message.error('请求出错了！'+error.message)
    return new Promise(()=>{});
  });
export default axios