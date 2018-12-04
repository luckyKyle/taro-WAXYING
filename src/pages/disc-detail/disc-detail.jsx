import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'
import { parseLargeNumber } from '../../utils/number'
import { AtIcon } from 'taro-ui'

import SongList from '../../components/SongList/SongList'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '歌单'
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      data: null, // 歌单数据
      showMask: false, //歌单信息遮罩
      id: '' // 歌单id
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 模糊背景
  blurryImg(img, blur = 15) {
    return `background: url(${img});background-size: cover;background-position:center; filter: blur(${blur}px)`
  }

  toggleMask() {
    this.setState({
      showMask: !this.state.showMask
    })
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    const { id } = this.$router.params //歌单ID
    const params = { id }
    api.getDiscDetail(params).then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        const data = res.playlist
        this.setState({
          data
        })
      }
    })
  }

  render() {
    if (this.state.data === null) return
    const { tracks, coverImgUrl, playCount, name, tags, creator, description } = this.state.data

    return (
      <View className={`disc-detail ${this.state.showMask ? 'fixed' : ''}`}>
        {/* 头部信息 */}
        <View className='header border-bottom-1px'>
          <View className='img-wrapper'>
            <Image src={coverImgUrl} mode='widthFix' lazy-load className='img' />
            <View className='count'>{parseLargeNumber(playCount)}</View>
            <View className='iconfont icon-iconfontgantanhao2 info' onClick={this.toggleMask} />
          </View>
          <View className='info-wrapper'>
            <Text className='title'>{name}</Text>
            {/* 标签 */}
            <View className='creator'>
              <Image mode='widthFix' src={creator.avatarUrl} className='avatar' />
              <Text className='nickname'>{creator.nickname}</Text>
            </View>
          </View>
          <View className='blurry-bg' style={this.blurryImg(coverImgUrl)} />
        </View>
        {/* 遮罩 */}
        <View className={`mask ${this.state.showMask ? 'show' : ''}`}>
          {/* 关闭按钮 */}
          <AtIcon value='close' size='22' color='#fff' className='mask-close' onClick={this.toggleMask} />
          <View className='mask-content'>
            <Image src={coverImgUrl} mode='widthFix' lazy-load className='mask-img' />
            <View className='mask-name'>{name}</View>
            {tags.length ? (
              <View className='mask-tags'>
                标签:
                {tags.map((tag, index) => (
                  <Text key={index} className='item'>
                    {tag}
                  </Text>
                ))}
              </View>
            ) : (
              <View />
            )}
            <View className='mask-desc'>{description || ''}</View>
          </View>

          <View className='blurry-bg' style={this.blurryImg(coverImgUrl, 30)} />
        </View>
        {/* 列表 */}
        <SongList list={tracks} />
      </View>
    )
  }
}
