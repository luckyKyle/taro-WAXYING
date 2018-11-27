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
      banners: [] // banner列表
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    api.getBanner().then(data => {
      console.log(data)
      Taro.hideLoading()
      this.setState({
        banners: data.banners,
        loading: false
      })
    })
  }

  // TODO 使用async函数有问题
  // async _fetchData() {
  //   try {
  //     Taro.showLoading({ title: '加载中' })
  //     const res = await api.getBanner()
  //     if (res.statusCode === 200) {
  //       const data = res.data
  //       this.setState({
  //         banners: data.banners,
  //         loading: false
  //       })
  //     }
  //     Taro.hideLoading()
  //   } catch (err) {}
  //   console.error(err)
  // }

  render() {
    return (
      <View className='index'>
        <Swiper className='test-h' indicatorColor='rgba(255,255,255,.45)' indicatorActiveColor='#d81e06' circular indicatorDots autoplay>
          {this.state.loading ? (
            <View className='txcenter'>加载中</View>
          ) : (
            this.state.banners.map(item => {
              return (
                <SwiperItem key={item}>
                  <View className='image-wrapper'>
                    <Image src={item.imageUrl} alt='' mode='aspectFill' className='img' />
                  </View>
                </SwiperItem>
              )
            })
          )}
        </Swiper>
        <Text>推荐页面</Text>
      </View>
    )
  }
}
