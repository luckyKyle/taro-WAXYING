import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.styl'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import iconFoot from './icon-foot.png'
import iconLike from './icon-like.png'
import iconFlash from './icon-flash.png'
import iconMan from './icon-man.png'

import avatar from './avatar.jpg'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      userFavoriteDiscList: [], // 用户收藏的歌单
      userCreatedDiscList: [] // 用户创建的歌单
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 获取创建歌单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    api.getUserPlayList().then(res => {
      console.log(res)
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        this.setState({
          loading: false,
          userCreatedDiscList: res.playlist.splice(0, 4),
          userFavoriteDiscList: res.playlist.splice(4)
        })
      }
    })
  }

  render() {
    return (
      <View className='my'>
        <View className='my-info-wrapper'>
          <View className='my-info'>
            <View className='user-avatar'>
              <Image className='img' mode='widthFix' src={avatar} />
            </View>
            <Text className='user-name'>KyleWang</Text>
            {/* <View className='user-sex'>
              <Image className='img' mode='widthFix' src={iconMan} />
            </View> */}
          </View>
        </View>
        <View className='main-list'>
          <View className='item'>
            <Image src={iconFoot} mode='aspectFit' className='icon' />
            <View className='text border-bottom-1px'>最近播放</View>
          </View>
          <View className='item'>
            <Image src={iconLike} mode='aspectFit' className='icon' />
            <View className='text border-bottom-1px'>我的收藏</View>
          </View>
          <View className='item'>
            <Image src={iconFlash} mode='aspectFit' className='icon' />
            <View className='text border-bottom-1px'>我的电台</View>
          </View>
        </View>
        {/* 创建的歌单 */}
        <View className='disc-title'>我创建的歌单</View>
        <View className='disc-list'>
          {this.state.userCreatedDiscList.map(item => (
            <View key={item.id} className='item'>
              <View className='image-wrapper'>
                <Image src={item.coverImgUrl} alt='' lazy-load mode='widthFix' className='img' />
              </View>
              <View className='desc-wrapper'>
                <Text className='text'>{item.name}</Text>
                <Text className='text count'>{item.trackCount}首</Text>
              </View>
            </View>
          ))}
        </View>
        {/* 收藏的歌单 */}
        <View className='disc-title'>我收藏的歌单</View>
        <View className='disc-list'>
          {this.state.userFavoriteDiscList.map(item => (
            <View key={item.id} className='item'>
              <View className='image-wrapper'>
                <Image src={item.coverImgUrl} alt='' lazy-load mode='aspectFill' className='img' />
              </View>
              <View className='desc-wrapper'>
                <Text className='text'>{item.name}</Text>
                <Text className='text count'>{item.trackCount}首</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
