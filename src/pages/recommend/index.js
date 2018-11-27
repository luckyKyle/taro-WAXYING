import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Text } from '@tarojs/components'
import api from '../../api'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '推荐歌单'
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      banners: [], // banner列表
      recommendList: [], // 推荐歌单
      newsongList: [] // 推荐新歌
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    // 获取Banner
    api.getBanner().then(data => {
      Taro.hideLoading()
      this.setState({
        banners: data.banners,
        loading: false
      })
    })

    // 获取推荐歌单
    api.getPersonalized().then(res => {
      this.setState({
        recommendList: res.result.splice(0, 6)
      })
    })

    // 获取新歌，
    api.getNewsong().then(res => {
      console.log('新歌，', res.result)
      this.setState({
        newsongList: res.result
      })
    })
  }

  render() {
    return (
      <View className='index'>
        <Swiper className='slider' indicatorColor='rgba(255,255,255,.45)' indicatorActiveColor='#d81e06' circular indicatorDots autoplay>
          {this.state.loading ? (
            <View className='txcenter'>加载中</View>
          ) : (
            this.state.banners.map(item => {
              return (
                <SwiperItem key={item.id}>
                  <View className='image-wrapper'>
                    <Image src={item.imageUrl} alt='' mode='aspectFill' className='img' />
                  </View>
                </SwiperItem>
              )
            })
          )}
        </Swiper>
        <View className='title'>推荐歌单</View>
        <View className='recommend-list'>
          {this.state.recommendList.map(item => {
            return (
              <View className='item' key={item.id}>
                <View className='img-wrapper'>
                  <Image src={item.picUrl} mode='widthFix' className='img' />
                  <Text className="count">{item.playCount}</Text>
                </View>
                <Text className='text'>{item.name}</Text>
              </View>
            )
          })}
        </View>
        <View className='title'>新歌速递</View>
        <View className='song-list'>
          {this.state.newsongList.map(item => {
            return (
              <View className='item border-bottom-1px' key={item.id}>
                <View className="content">
                  <View className='name'>
                    {item.name}
                    <Text className='sub'>{item.song.alias.length ? `(${item.song.alias[0]})` : ''}</Text>
                  </View>
                  <View className='artists'>{item.song.artists.map(artist => ` ${artist.name}`).join('/')}</View>
                </View>
                <View className="play">play</View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
