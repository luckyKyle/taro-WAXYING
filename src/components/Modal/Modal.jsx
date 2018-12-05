import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import './main.styl'
import '../../common/stylus/common/iconfont.styl'

export default class DiscList extends Component {
  static defaultProps = {
    title: '123', //  标题
    content: '内容内容内容', // 内容
    cancelText: '', // 取消文案
    confirmText: '', // 确认文案
    isShow: true, // 默认隐藏
    // 按钮配置
    options: [
      {
        text: '取消',
        style: {
          color: '#333',
          backgroundColor: '#F7F7F7'
        }
      },
      {
        text: '确认',
        style: {
          backgroundColor: '#E93B3D',
          color: '#fff'
        }
      }
    ]
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string]),
    content: PropTypes.oneOfType([PropTypes.string]),
    cancelText: PropTypes.oneOfType([PropTypes.string]),
    confirmText: PropTypes.oneOfType([PropTypes.string]),
    options: PropTypes.oneOfType([PropTypes.array])
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleTouchMove = e => {
    console.log(e)
    e.stopPropagation()
  }

  render() {
    const { title, content, isShow, options } = this.props

    return (
      <View className={`modal-wrapper ${isShow ? 'show' : ''}`}>
        <View className='modal'>
          <View className='modal-title border-bottom-1px'>{title}</View>
          <View className='modal-content'>{content}</View>
          <View className='modal-btns'>
            {options.map((item, index) => (
              <View style={item.style} key={index} className='btn'>
                {item.text}
              </View>
            ))}
          </View>
        </View>
        <View className='mask' onTouchMove={this.handleTouchMove} />
      </View>
    )
  }
}
