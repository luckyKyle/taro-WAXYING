import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
// import PropTypes from 'prop-types'
import './main.styl'
import '../../common/stylus/common/iconfont.styl'
import '../../common/stylus/common/border.styl'

export default class SongList extends Component {
  static defaultProps = {
    list: []
  }

  toPlaySong(id) {
    Taro.navigateTo({ url: `/pages/play-song/play-song?ids=${id}` })
  }

  render() {
    return (
      <View className='song-list-wrapper'>
        {this.props.list.map(item => (
          <View className='item border-bottom-1px' key={item.id} onClick={this.toPlaySong.bind(this, item.id)}>
            <View className='content'>
              <View className='name'>
                {item.name}
                <Text className='sub'>{item.song.alias.length ? `(${item.song.alias[0]})` : ''}</Text>
              </View>
              <View className='artists'>{(item.song ? item.song.artists : item.ar).map(artist => ` ${artist.name}`).join('/')}</View>
            </View>
            <View className='play iconfont icon-bofang-yuanshijituantubiao' />
          </View>
        ))}
      </View>
    )
  }
}
