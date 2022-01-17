/**
 * axios二次封装
 **/

import axios from 'axios'
import cfg from './../config/index'
import {message} from 'ant-design-vue'

const TOKEN_INVALID = '请重新登录'
const NETWORK_ERROR = '请求异常，请稍后重试'

// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: cfg.baseApi,
  timeout: 8000
})


// 请求拦截
service.interceptors.request.use((req)=>{
  const headers = req.headers;
  if(!headers.Authorization) headers.Authorization = "S Webber"
  return req
})

// 响应拦截
service.interceptors.response.use((res)=>{
  const { code, data, msg} = res.data;
  if(code===200){
    return data;
  }else if(code===40001){
    message.error(TOKEN_INVALID,3000)
    setTimeout({
      // router.push('/login')
    },1500)
    return Promise.reject(TOKEN_INVALID)
  }else{
    message.error(msg|NETWORK_ERROR)
    return Promise.reject(msg|NETWORK_ERROR)
  }
})

function request(options){
  options.method = options.method || 'get'
  if(options.method.toLowerCase()==='get'){
    options.params = options.data;
  }
  if(cfg.env==='prod'){
    service.defaults.baseURL = cfg.baseApi
  }else{
    service.defaults.baseURL = cfg.mock ? cfg.mockApi:cfg.baseApi
  }

  return service(options)
}

['get','post','put','delete','patch'].forEach((item)=>{
  request[item] = (url,data,options)=>{
    return request({
      url,
      data,
      method:item,
      ...options
    })
  }
})

export default request
