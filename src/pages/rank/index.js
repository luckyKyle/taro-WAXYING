import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '排行榜'
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      artistToplist: null,
      rank_netease: {
        title: '',
        list: []
      },
      rank_global: {
        title: '',
        list: []
      },
      rank_user: {
        title: '用户榜',
        list: []
      },
      topList: [] // 排行榜列表
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
        res.artistToplist.coverImgUrl = res.artistToplist.coverUrl
        // let list1 = res.list.splice(0, 4).concat(res.artistToplist)
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
        <View className='title'>{this.state.rank_netease.title}</View>
        <View className="list">
          {this.state.rank_netease.list.map(item => (
            <View key={item.id} className='item'>
              <View className='image-wrapper'>
                <Image src={item.coverImgUrl} alt='' lazy-load={true} mode='aspectFill' className='img' />
                <Text className="update">{item.updateFrequency}</Text>
              </View>
              <Text className="text">{item.name}</Text>
            </View>
          ))}
        </View>

        <View className='title'>{this.state.rank_global.title}</View>
        <View className="list">
          {this.state.rank_global.list.map(item => (
            <View key={item.id} className='item'>
              <View className='image-wrapper'>
                <Image src={item.coverImgUrl} alt='' lazy-load={true} mode='aspectFill' className='img' />
                <Text className="update">{item.updateFrequency}</Text>
              </View>
              <Text className="text">{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
