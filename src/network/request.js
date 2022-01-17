import axios from 'axios'

// 配置 axios
// export function request (config) {
//   const instance = axios.create({
//     baseURL: 'http://ttapi.research.itcast.cn/',
//     timeout: 5000
//   })

//   // 请求拦截
//   instance.interceptors.request.use(config => {
//     return config
//   }, err => {
//     return err
//   })

//   // 响应拦截
//   instance.interceptors.response.use(res => {
//     // console.log(res)
//     return res.data ? res.data : res
//   }, err => {
//     return err
//   })

//   return instance(config)
// }
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 最新接口地址
  // baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

export default request
