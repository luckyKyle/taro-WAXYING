import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Text, Image } from '@tarojs/components'

import DiscList from '../../components/DiscList/DiscList'
import MvList from '../../components/MvList/MvList'
import SongList from '../../components/SongList/SongList'
import SearchBar from '../../components/SearchBar/SearchBar'

import api from '../../api'
import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '推荐'
  }

  constructor() {
    this.state = {
      loading: true, // 加载状态
      banners: [], // banner列表
      discList: [], // 推荐歌单
      newsongList: [], // 推荐新歌
      mvList: [] // 推荐新歌
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  // 角标颜色
  titleType(color) {
    let str = ''
    switch (color) {
      case 'red':
        str = '#d93f30'
        break
      case 'blue':
        str = '#1bb3ff'
        break
    }
    str = `background-color:${str}`
    return str
  }

  _fetchData() {
    Taro.showLoading({ title: '加载中' })

    // 获取Banner，推荐歌单，推荐MV ，新歌
    const queue = [api.getBanner(), api.getPersonalized(), api.getPersonalizedMv(), api.getNewsong()]
    Promise.all(queue).then(data => {
      console.log('data===', data)
      Taro.hideLoading()
      this.setState({
        banners: data[0].banners,
        discList: data[1].splice(0, 6),
        mvList: data[2],
        newsongList: data[3],
        loading: false
      })
    })
  }

  render() {
    return (
      <View className='recommend'>
        <SearchBar />
        {/* 轮播 */}
        <Swiper className='slider' indicatorColor='rgba(255,255,255,.45)' indicatorActiveColor='#d81e06' circular indicatorDots autoplay>
          {this.state.banners.map(item => {
            return (
              <SwiperItem key={item.id}>
                <View className='image-wrapper'>
                  <Text className='type-title' style={this.titleType(item.titleColor)}>
                    {item.typeTitle}
                  </Text>
                  <Image src={item.imageUrl} alt='' mode='aspectFill' className='img' />
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>
        {/* 推荐歌单 */}
        <View className='title'>推荐歌单</View>
        <DiscList list={this.state.discList}></DiscList>

        {/* 推荐MV */}
        <View className='title'>推荐MV</View>
        <MvList list={this.state.mvList} />

        {/* 新歌速递 */}
        <View className='title'>新歌速递</View>
        <SongList list={this.state.newsongList}></SongList>
      </View>
    )
  }
}
