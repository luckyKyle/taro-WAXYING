import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './main.styl'

import { AtSearchBar } from 'taro-ui'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '搜索'
  }

  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }

  onChange(value) {
    this.setState({
      value: value
    })
  }

  onActionClick() {
    console.log('开始搜索')
  }

  componentDidMount() {}

  onPullDownRefresh(ev) {
    setTimeout(() => {
      console.log('停止下拉')
      Taro.stopPullDownRefresh()
    }, 2000)
  }

  render() {
    return (
      <View className='search'>
        <AtSearchBar value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)} />
      </View>
    )
  }
}
