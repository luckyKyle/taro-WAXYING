import {
  HOST
} from './config'
import Taro from '@tarojs/taro'

export default {

  // 获取banner
  getBanner: (params) => Taro.request({
    url: HOST + 'banner'
  })
}
