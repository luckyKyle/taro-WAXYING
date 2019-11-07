import { HOST, ERR_OK } from './config'

import Taro from '@tarojs/taro'

const Fly = require('flyio/dist/npm/wx')
const fly = new Fly() // 创建fly实例

export function showNormal(text) {
  Taro.showToast({
    title: text,
    icon: 'none',
  })
}

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  Taro.showNavigationBarLoading()
  // 给所有请求添加自定义header
  // config.headers['X-Tag'] = 'flyio'
  config.headers = {
    'X-Tag': 'flyio',
    'Content-Type': 'application/x-www-form-urlencoded',
    source: 'miniApp',
  }

  return config
})

// 服务器响应
fly.interceptors.response.use(
  (response, promise) => {
    let res = response.data
    let data = res.result || res.data
    let timer = null

    if (typeof data === 'string' && data !== '') {
      data = JSON.parse(data)
    }
    clearTimeout(timer)
    if (res.code === ERR_OK) {
      promise.resolve(res.result)
    } else {
      showNormal(res.message)
    }
    Taro.hideNavigationBarLoading()
    return data || res // 将请求结果返回
  },
  (err, promise) => {
    // Do something with response error
    console.error('拦截器错误消息：', err)
    showNormal(err.message)
    Taro.hideNavigationBarLoading()
    promise.reject(err)
  },
)

// 配置请求基地址
fly.config.baseURL = HOST

export default fly
