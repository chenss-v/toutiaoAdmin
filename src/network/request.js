// 引入axios
import axios from 'axios'
// 引入处理json数据的json-bigint
import JSONbig from 'json-bigint'
import router from '../router/router'
import { Message } from 'element-ui'

// 创建一个axios实例
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://api-toutiao-web.itheima.net',

  // 自定义处理json原始数据的方式
  // 定义后端返回的原始数据的处理(处理一些数据太大 json处理不了的时候)
  transformResponse: [function (data) { // data数据为原始数据 未经处理的json格式
    // axios默认是通过json.perse来转换格式，这里使用jsonBig.perse转换
    // 但后端返回的可能不是json格式字符串，jsonBig就会报错，通过try-catch捕获异常，异常时返回axios原始转换格式的data
    try {
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
  }]

})

// 请求拦截器interceptors === 每次请求 之前 在请求体中添加 用户基本信息
request.interceptors.request.use(
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果请求信息内没有user === 添加
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 最后经过return...之后 => 请求才真正发送出去
    return config
  }
  // 请求失败
  // function (error) {
  //   return Promise.reject(error)
  // }
)

// 相应拦截器 === 当使用虚假user进入主页时 > 发送请求相应拦截 自动删除user 并返回login
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 当请求状态码为 2xx 的走这里 === 必须 return 否则在请求的地方拿不到数据
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // 当请求码为 2xx 以外的走这里
  const { status } = error.response
  if (status === 401) { // 当请求错误 有reponse值 且response.status为401
    window.localStorage.removeItem('user') // 清楚虚假user
    router.push('./login') // 转到login
    Message.error('登陆状态无效，请重新登陆') // 提示信息
  } else if (status === 400) { // 按照请求码提示用户错误信息
    Message.error('参数错误，请检查请求参数')
  } else if (status === 403) {
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status >= 500) {
    Message.error('服务器内部异常，请稍后重试')
  }
  return Promise.reject(error)
})

// 导出实例
export default request
