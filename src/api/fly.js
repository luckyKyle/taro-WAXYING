import { HOST, ERR_OK } from './config'
const Fly = require('flyio/dist/npm/wx') // wx.js为flyio的微信小程序入口文件
const fly = new Fly() // 创建fly实例


export function showNormal(text) {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  wx.showNavigationBarLoading()
  // 给所有请求添加自定义header
  config.headers['X-Tag'] = 'flyio'
  return config
})

// 服务器响应
fly.interceptors.response.use(
  (response, promise) => {
    let res = response.data
    let data = res.data
    let timer = null

    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data)
    }
    clearTimeout(timer)
    if (res.code === ERR_OK) {
      promise.resolve(data)
    } else {
      showNormal(res.message)
    }
    wx.hideNavigationBarLoading()
    console.log('拦截器返回结果：', res)
    return res // 将请求结果返回
  },
  (err, promise) => {
    // Do something with response error
    console.log('拦截器错误消息：', err)
    showNormal(err.message)
    wx.hideNavigationBarLoading()
    promise.reject(err)
  }
)

// 配置请求基地址
fly.config.baseURL = HOST

export default fly
