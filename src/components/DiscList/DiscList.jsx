import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { parseLargeNumber } from '../../utils/number'
import PropTypes from 'prop-types'
import './main.styl'
import '../../common/stylus/common/iconfont.styl'

// const defaultProps = { list: PropTypes.array }

export default class DiscList extends Component {
  static defaultProps = {
    list: []
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  toDetail = id => {
    // console.log(id)
    Taro.navigateTo({ url: `/pages/disc-detail/disc-detail?id=${id}` })
  }

  render() {
    return (
      <View className='disc-list-wrapper'>
        {this.props.list.map(item => (
          <View className='disc-item item' key={item.id} onClick={this.toDetail.bind(this, item.id)}>
            <View className='img-wrapper'>
              <Image src={item.picUrl} mode='widthFix' lazy-load className='img' />
              <View className='count'>{parseLargeNumber(item.playCount)}</View>
            </View>
            <Text className='text'>{item.name}</Text>
          </View>
        ))}
      </View>
    )
  }
}
