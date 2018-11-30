import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'
import { parseLargeNumber } from '../../utils/number'

import SongList from '../../components/SongList/SongList'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '准备播放...'
  }

  constructor() {
    this.state = {
      params: null,
      data: null,
      loading: true // 加载状态
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this._fetchData()
  }

  blurryImg(img) {
    return `background: url(${img});background-size: cover;filter: blur(15px)`
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    const { ids } = this.$router.params //歌单ID
    const params = { ids }
    api.getSongDetail(params).then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        const data = res.songs[0]
        this.setState({
          data
        })
        console.log(data)
        Taro.setNavigationBarTitle({ title: data.name })
      }
    })
  }

  render() {
    if (this.state.data === null) return
    const { al } = this.state.data
    console.log('专辑:', al)

    return (
      <View className='play'>
        <View>
          <Image src={al.picUrl} />
        </View>
      </View>
    )
  }
}
