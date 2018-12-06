import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import DiscList from '../../components/DiscList/DiscList'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '排行榜'
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true, // 加载状态
      rank_netease: {
        list: []
      },
      rank_global: {
        list: []
      }
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    api.getToplist().then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        //  res.artistToplist  歌手榜
        res.artistToplist.id = 'singerTop'
        this.setState({
          rank_netease: {
            title: '云音乐官方榜',
            list: res.list.slice(0, 4).concat(res.artistToplist)
          },
          rank_global: {
            title: '全球榜',
            list: res.list.splice(4)
          },
          loading: false
        })
      }
    })
  }

  render() {
    return (
      <View className='rank'>
        {/* 官方榜 */}
        <View className='title'>{this.state.rank_netease.title}</View>
        <DiscList list={this.state.rank_netease.list} isRank />

        {/* 全球榜 */}
        <View className='title'>{this.state.rank_global.title}</View>
        <DiscList list={this.state.rank_global.list} isRank />
      </View>
    )
  }
}
