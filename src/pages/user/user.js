import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './main.styl'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import iconFoot from './icon-foot.png'
import iconLike from './icon-like.png'
import iconFlash from './icon-flash.png'

import avatar from './avatar1.jpg'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  MAIN_LIST = [
    {
      title: '最近播放',
      icon: iconFoot
    },
    {
      title: '我的收藏',
      icon: iconLike
    },
    {
      title: '我的收藏',
      icon: iconFlash
    }
  ]

  constructor() {
    this.state = {
      loading: true, // 加载状态
      userFavoriteDiscList: [], // 用户收藏的歌单
      userCreatedDiscList: [] // 用户创建的歌单
    }
  }

  componentDidMount() {
    this._fetchData()
    console.log(Taro)
  }

  // Taro.startPullDownRefresh()
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
          </View>
        </View>
        <View className='main-list'>
          {this.MAIN_LIST.map((item, index) => (
            <View className='item' key={index}>
              <Image src={item.icon} mode='aspectFit' className='icon' />
              <View className='text border-bottom-1px'>{item.title}</View>
            </View>
          ))}
        </View>
        {/* 创建的歌单 */}
        <View className='disc-title'>我创建的歌单</View>
        <View className='disc-list'>
          {this.state.userCreatedDiscList.map(item => (
            <View key={item.id} className='item'>
              <View className='image-wrapper'>
                <Image src={item.coverImgUrl} alt='' lazy-load mode='widthFix' className='img' />
              </View>
              <View className='desc-wrapper border-bottom-1px'>
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
                <Image src={item.coverImgUrl} alt='' lazy-load mode='widthFix' className='img' />
              </View>
              <View className='desc-wrapper border-bottom-1px'>
                <Text className='text'>{item.name}</Text>
                <Text className='text count'>
                  {item.trackCount}首, by{item.creator.nickname}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
