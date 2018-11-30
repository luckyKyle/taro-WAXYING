import Taro, { Component } from '@tarojs/taro'
import { View, Video, Image } from '@tarojs/components'
import api from '../../api'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '准备播放...'
  }

  constructor() {
    this.state = {
      data: null, // 数据源
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
    const { mvid } = this.$router.params //歌单ID
    const params = { mvid }
    api.getMvDetail(params).then(data => {
      console.log('data==', data)
      Taro.hideLoading()
      this.setState({
        data
      })
      console.log(data)
      Taro.setNavigationBarTitle({ title: data.name })
    })
  }

  render() {
    if (this.state.data === null) return
    console.log('视频数据====', this.state.data)
    const { brs, name, briefDesc,desc } = this.state.data

    return (
      <View className='video-container'>
        <Video src={brs[1080]} autoplay className='video' />
        {/* 介绍 */}
        <View>
          <Text>{briefDesc || name}</Text>
          <Text>{desc}</Text>
        </View>
      </View>
    )
  }
}
