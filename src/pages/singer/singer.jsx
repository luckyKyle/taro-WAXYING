import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import { AtAvatar, AtTabs, AtTabsPane } from 'taro-ui'
import Loading from '../../components/Loading/Loading'

import './main.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '歌手榜'
  }

  constructor() {
    super(...arguments)
    this.state = {
      loading: true, // 加载状态
      updateTime: '',
      current: 0,
      artists: [] //歌手列表
    }
  }

  componentWillMount() {
    this._fetchData()
  }

  componentDidMount() {
    Taro.hideLoading()
  }

  handleClick(stateName, value) {
    console.log(stateName)
    this.setState({
      current: value
    })
  }

  TAB_LIST = [{ title: '华语' }, { title: '欧美' }, { title: '韩国' }, { title: '日本' }]

  static test() {
    return 123
  }

  // 获取所有榜单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    api.getArtist().then(res => {
      if (res.code === ERR_OK) {
        console.log(res)
        const { artists, updateTime } = res.list
        this.setState({
          artists,
          updateTime,
          loading: false
        })
      }
    })
  }

  render() {
    const { current } = this.state
    return (
      <View className='singer panel__content'>
        <View className='panel__content'>
          {/* Tab */}
          <AtTabs current={current} tabList={this.TAB_LIST} onClick={this.handleClick.bind(this, 'current')}>
            {this.TAB_LIST.map((item, index) => (
              <AtTabsPane current={current} index={index} key={index}>
                {/* 内容 */}
                {this.state.loading ? (
                  <View className='sk-wave'>
                    <View className='sk-rect sk-rect1' />
                    <View className='sk-rect sk-rect2' />
                    <View className='sk-rect sk-rect3' />
                    <View className='sk-rect sk-rect4' />
                    <View className='sk-rect sk-rect5' />
                  </View>
                ) : (
                  <View className='sk-wave'>
                    <View className='sk-rect sk-rect1' />
                    <View className='sk-rect sk-rect2' />
                    <View className='sk-rect sk-rect3' />
                    <View className='sk-rect sk-rect4' />
                    <View className='sk-rect sk-rect5' />
                  </View>
                  // <View className='tab-content singer-list'>
                  //   {this.state.artists.map((artist, rank) => (
                  //     <View className='item border-bottom-1px' key={artist.id}>
                  //       <View className='rank'>
                  //         <Text>本次:{rank + 1}</Text>
                  //         <Text>上次:{artist.lastRank + 1}</Text>
                  //       </View>
                  //       <View className='avatar'>
                  //         <AtAvatar image={artist.img1v1Url} />
                  //       </View>
                  //       <View className='name'>{artist.name}</View>
                  //     </View>
                  //   ))}
                  // </View>
                )}
              </AtTabsPane>
            ))}
          </AtTabs>
        </View>
      </View>
    )
  }
}
