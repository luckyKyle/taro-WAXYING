import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import SongList from '../../components/SongList/SongList'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: ''
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      data: null, // 歌单信息
      id: '' // 歌单id
    }
  }

  componentWillMount() {
    const { id } = this.$router.params
    this.setState({
      id
    })
  }

  componentDidMount() {
    this._fetchData()
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    const params = {
      id: this.state.id
    }
    api.getDiscDetail(params).then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        const data = res.playlist
        console.log('res===', data.name)
        this.setState({
          data
        })
        this.config.navigationBarTitleText = data.name
      }
    })
  }

  render() {
    return (
      <View className='disc-detail'>
        <View>{this.state.id}</View>
        {/* <SongList list={this.state.list} /> */}
        {this.state.data.tracks.map(item => (
          <View key={item.id}>{item.name}</View>
        ))}
      </View>
    )
  }
}
