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
      isSubscribed: false
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 模糊背景
  blurryImg(img, blur = 15) {
    return `background: url(${img});background-size: cover;background-position:center; filter: blur(${blur}px)`
  }

  // 切换遮罩背景
  toggleMask() {
    this.setState({
      showMask: !this.state.showMask
    })
  }

  // 跳转到播放器
  toPlaySong(ids) {
    // ids = ids.split(',')
    if (!ids.length) return
    ids = ids.map(item => item.id).join(',')
    console.log(ids)
    Taro.navigateTo({ url: `/pages/play-song/play-song?ids=${ids}` })
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    const { id } = this.$router.params //歌单ID
    const params = { id }

    // api.getUserPlayList
    api.getDiscDetail(params)
      .then(res => {
        console.log(res.playlist)
        if (res.code === ERR_OK) {
          Taro.hideLoading()
          const data = res.playlist
          this.setState({
            data
          })
        }
      }).then(res=>{
        api.getUserPlayList().then(user => {
          console.log('this.state.data==>', this.state.data)
          console.log(user.playlist.some(item=>item.id===this.state.data.id))
          this.setState({
            // isSubscribed:user.playlist
          })
        })
      })
  }

  render() {
    if (this.state.data === null) return
    const { tracks, trackIds, trackCount, subscribed, subscribedCount, coverImgUrl, playCount, name, tags, creator, description } = this.state.data

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
        <View className='song-bar border-bottom-1px'>
          <View className='play-all' onClick={this.toPlaySong.bind(this, trackIds)}>
            播放全部<Text className='total'>(共{trackCount}首)</Text>
          </View>
          {subscribed ? <View>已收藏</View> : <View className='add-subscribed'>+收藏({parseLargeNumber(subscribedCount)})</View>}
        </View>
        <SongList list={tracks} />
      </View>
    )
  }
}
