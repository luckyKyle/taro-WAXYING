import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'prop-types'
import './main.styl'
import '../../common/stylus/common/border.styl'
// import { isFunction } from 'lodash'

export default class DiscList extends Component {
  static defaultProps = {
    title: '', //  标题
    content: '', // 内容
    cancelText: '取消', // 取消文案
    confirmText: '确认', // 确认文案
    isShow: false // 默认隐藏
  }

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string]),
    content: PropTypes.oneOfType([PropTypes.string]),
    cancelText: PropTypes.oneOfType([PropTypes.string]),
    confirmText: PropTypes.oneOfType([PropTypes.string]),
    options: PropTypes.oneOfType([PropTypes.array]),
    isShow: PropTypes.oneOfType([PropTypes.bool])
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  // 点击关闭
  handleClose = () => {
    this.props.onClose instanceof Function && this.props.onClose()
  }

  // 点击取消
  handleCancel = () => {
    this.props.onCancel instanceof Function && this.props.onCancel(0)
  }

  // 点击确认
  handleConfirm = () => {
    this.props.onConfirm instanceof Function && this.props.onConfirm(1)
  }

  // 滑动阻止冒泡
  handleTouchMove = e => {
    e.stopPropagation()
  }

  render() {
    const { title, content, cancelText, confirmText, isShow, options } = this.props

    return (
      <View className={`modal-wrapper ${isShow ? 'show' : ''}`}>
        <View className='modal'>
          {/* 标题 */}
          {title.length ? <View className='modal-title border-bottom-1px'>{title}</View> : <View />}
          {/* 内容 */}
          <View className='modal-content'>{content}</View>
          {/* 按钮 */}
          <View className='modal-btns'>
            {/* 取消按钮 */}
            {cancelText && (
              <View onClick={this.handleCancel} className='btn-cancel btn'>
                {cancelText}
              </View>
            )}
            {/* 确认按钮 */}
            {confirmText && (
              <View onClick={this.handleConfirm} className='btn-confirm btn'>
                {confirmText}
              </View>
            )}
          </View>
        </View>
        <View className='mask' onTouchMove={this.handleTouchMove} />
      </View>
    )
  }
}
