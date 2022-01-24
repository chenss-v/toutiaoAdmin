import axios from 'axios'
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

// 请求拦截
request.interceptors.request.use(
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  }
)

export default request
