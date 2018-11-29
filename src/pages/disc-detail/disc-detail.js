import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'
import { parseLargeNumber } from '../../utils/number'

import SongList from '../../components/SongList/SongList'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '歌单'
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      data: null, // 歌单信息
      id: '' // 歌单id
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    const { id } = this.$router.params //歌单ID
    const params = { id }
    api.getDiscDetail(params).then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        const data = res.playlist
        console.log('data===', data)
        this.setState({
          data
        })
        // Taro.setNavigationBarTitle({ title: data.name })
      }
    })
  }

  render() {
    if (this.state.data === null) return
    const { tracks, coverImgUrl, playCount } = this.state.data

    return (
      <View className='disc-detail'>
        <View className='disc-info'>
          <View className='img-wrapper'>
            <Image src={coverImgUrl}  mode='widthFix' lazy-load className='img'/>
            <View className='count'>{parseLargeNumber(playCount)}</View>
            <View className='iconfont icon-vynil' />
          </View>
        </View>
        {tracks.map(item => (
          <View key={item.id}>{item.name}</View>
        ))}
      </View>
    )
  }
}
