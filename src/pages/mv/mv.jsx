import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import MvList from '../../components/MvList/MvList'
import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '视频'
  }
  constructor() {
    this.state = {
      mvList: []
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 获取mv列表数据
  _fetchData() {
    api.getMvList().then(data => {
      console.log('mv', data)
      this.setState({
        mvList: data
      })
    })
  }

  render() {
    return (
      <View className="mv">
        <MvList list={this.state.mvList} />
      </View>
    )
  }
}
