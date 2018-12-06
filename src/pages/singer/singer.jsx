import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'
import { timestampToTime } from '../../utils/date'

import { AtAvatar, AtIcon, AtToast, AtActivityIndicator } from 'taro-ui'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '歌手榜'
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true, // 加载状态
      updateTime: '', // 更新时间
      tipShow: false,
      artists: [] //歌手列表
    }
  }

  componentWillMount() {
    this._fetchData()
  }

  componentDidMount() {
    Taro.hideLoading()
  }

  showTip() {
    this.setState({
      tipShow: true
    })
  }

  // TAB_LIST = [{ title: '华语' }, { title: '欧美' }, { title: '韩国' }, { title: '日本' }]
  tipText = '选取云音乐中热度最高的100名歌手，每天更新。热度由收藏歌手、歌手歌曲的播放、收藏、分享数量和歌手话题活跃情况综合计算。'

  // 获取所有榜单
  _fetchData() {
    api.getArtist().then(res => {
      if (res.code === ERR_OK) {
        console.log(res)
        const { artists, updateTime } = res.list
        this.setState({
          artists,
          updateTime: timestampToTime(updateTime),
          loading: false
        })
      }
    })
  }

  toDetail() {}

  // 计算排行上升或下降
  _rise(val = 101, rank) {
    val = val - rank
    return val > 0 ? `+${val}` : val
  }
  // <AtIcon value='clock' size='30' color='#F00'></AtIcon>
  _riseIcon(val = 101, rank) {
    let obj = {}
    val = val - rank
    obj.icon = val === 0 ? '' : val > 0 ? 'arrow-up' : 'arrow-down'
    obj.color = val === 0 ? '' : val > 0 ? '#ff1a1a' : '#258ae2'
    return obj
  }

  render() {
    return (
      <View className='singer'>
        {/* 最近更新 */}
        {this.state.updateTime.length ? (
          <View className='update-time' onClick={this.showTip}>
            最近更新:{this.state.updateTime}
          </View>
        ) : (
          <View className='loading-wrapper'>
            <AtActivityIndicator size={28} color='#d81e06' content='加载中...' mode='center' />
          </View>
        )}
        {/*  提示 */}
        <AtToast isOpened={this.state.tipShow} hasMask text={this.tipText} />
        {/* 列表 */}
        {this.state.artists.map((artist, rank) => (
          <View className='singer-item' key={artist.id} onClick={this.toDetail}>
            <View className='rank'>
              <Text className='ranking'>{rank + 1}</Text>
              <View className='rise'>
                <AtIcon value={this._riseIcon(artist.lastRank, rank).icon} size='10' color={this._riseIcon(artist.lastRank, rank).color} />
                <Text className='text'>{this._rise(artist.lastRank, rank)}</Text>
              </View>
            </View>
            <View className='avatar'>
              <AtAvatar image={artist.img1v1Url} />
            </View>
            <View className='content'>
              <Text className='name'>{artist.name}</Text>
              <Text className='score icon-huore iconfont'>{artist.score}</Text>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
