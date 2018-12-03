import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './main.styl'

export default class Loading extends Component {
  render() {
    return (
      <View className='sk-wave'>
        <View className='sk-rect sk-rect1' />
        <View className='sk-rect sk-rect2' />
        <View className='sk-rect sk-rect3' />
        <View className='sk-rect sk-rect4' />
        <View className='sk-rect sk-rect5' />
      </View>
    )
  }
}
