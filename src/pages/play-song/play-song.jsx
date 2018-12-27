import Taro, { Component } from '@tarojs/taro'
import { View, Audio, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import SongList from '../../components/SongList/SongList'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '准备播放...',
  }

  constructor(props) {
    super(props)
    this.state = {
      data: null, // 数据源
      loading: true, // 加载状态
      currentSong: null, // 当前歌曲地址
      simiSongs: [], //相似歌曲列表
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this._fetchData()
  }

  blurryImg(img) {
    return `background: url(${img});background-size: cover;filter: blur(15px)`
  }

  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    const { id } = this.$router.params //歌单ID
    let params = { ids: id }
    // 获取歌曲详情
    api.getSongDetail(params).then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        const data = res.songs[0]
        this.setState({
          data,
        })
        console.log('歌曲信息:', data)

        Taro.setNavigationBarTitle({ title: data.name })
      }
    })
    // 获取歌曲地址
    params = { id }
    Promise.all([api.getSongUrl(params), api.getSimiSongs(params)]).then(res => {
      const currentSong = res[0][0]
      const simiSongs = res[1].songs

      console.log('相似歌曲==>', simiSongs)

      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = currentSong.url
      innerAudioContext.onPlay = () => {
        console.log('开始播放')
      }

      this.setState({
        currentSong,
        simiSongs,
      })
    })

    //获取歌曲地址
    // api.getSongUrl(params).then(res => {
    //   console.log('歌曲地址==>', res)
    //   const data = res[0]
    //   this.setState({
    //     songUrl: data.url,
    //   })

    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext = {
    //   autoplay: true,
    //   src: data.url,
    //   onPlay: () => {
    //     console.log('开始播放')
    //   },
    // }
    // })
  }

  render() {
    if (this.state.data === null) return
    const { data, simiSongs } = this.state
    const { al } = data

    console.log('rneder', simiSongs)

    return (
      <View className='play'>
        <View>
          <Image src={al.picUrl} />
        </View>
        {simiSongs.length ? <SongList list={this.state.simiSongs} /> : ''}
      </View>
    )
  }
}
