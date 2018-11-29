import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './main.styl'
import '../../common/stylus/common/iconfont.styl'

export default class SearchBar extends Component {
  // 跳转到搜索
  toSearch() {
    Taro.navigateTo({ url: '/pages/search/search' })
  }

  render() {
    return (
      <View className='search-bar'>
        <View className='input' onClick={this.toSearch}>
          <Text className='iconfont icon-sousuo1' />
          搜索
        </View>
      </View>
    )
  }
}
