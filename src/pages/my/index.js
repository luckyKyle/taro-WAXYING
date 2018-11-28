import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  render() {
    return (
      <View className='my'>
        <View className='my-info-wrapper'>
          <View className='my-info'>
            <View>
              <Image src='' />
            </View>
            <Text>用户名</Text>
          </View>
        </View>
      </View>
    )
  }
}
