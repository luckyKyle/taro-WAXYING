import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './main.styl'
import api from '../../api'
import { ERR_OK } from '../../api/config'

import { AtSwipeAction } from 'taro-ui'
import Modal from '../../components/Modal/Modal'

import iconFoot from './icon-foot.png'
import iconLike from './icon-like.png'
import iconFlash from './icon-flash.png'
import avatar from './avatar1.jpg'

export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  }

  mainList = [
    {
      title: '最近播放',
      icon: iconFoot,
    },
    {
      title: '我的收藏',
      icon: iconLike,
    },
    {
      title: '我的电台',
      icon: iconFlash,
    },
  ]

  actionOption = [
    {
      text: '确认',
      style: {
        backgroundColor: '#FF4949',
      },
    },
  ]

  constructor(props) {
    super(props)
    this.state = {
      loading: true, // 加载状态
      showModal: false, // 模态框显示状态
      hideAction: false, // 隐藏滑动按钮
      delDiscId: '',
      userFavoriteDiscList: [], // 用户收藏的歌单
      userCreatedDiscList: [], // 用户创建的歌单
    }
  }

  componentDidMount() {
    this._fetchData()
  }

  componentDidHide() {
    this.setState({
      hideAction: true,
    })
  }

  // 跳转到歌单详情
  toDetail = id => {
    Taro.navigateTo({ url: `/pages/disc-detail/disc-detail?id=${id}` })
  }
  // Taro.startPullDownRefresh()

  // 显示弹窗
  showModal(delDiscId, key, e) {
    console.log('key==', key)
    if (key === 0) return
    this.setState({
      showModal: true,
      delDiscId,
    })
  }

  // 确定删除
  modalConfirm(e) {
    console.log('确定删除', this.state.delDiscId)
    this.setState({
      showModal: false,
    })
  }

  // 取消删除
  modalCancel(e) {
    console.log('取消删除', e)
    this.setState({
      showModal: false,
    })
  }

  // 分割创建歌单和收藏歌单
  _splitList(userId, list) {
    let userCreatedDiscList = []
    let userFavoriteDiscList = []
    list.forEach(item => {
      if (item.creator.userId === userId) {
        userCreatedDiscList.push(item)
      } else {
        userFavoriteDiscList.push(item)
      }
    })
    return { userCreatedDiscList, userFavoriteDiscList }
  }

  // 获取创建歌单
  _fetchData() {
    Taro.showLoading({ title: '加载中' })
    api.getUserPlayList().then(res => {
      if (res.code === ERR_OK) {
        Taro.hideLoading()
        const { userId } = res.playlist[0].creator
        const { userCreatedDiscList, userFavoriteDiscList } = this._splitList(userId, res.playlist)
        this.setState({
          loading: false,
          userCreatedDiscList,
          userFavoriteDiscList,
        })
      }
    })
  }

  render() {
    const { userCreatedDiscList, userFavoriteDiscList, showModal, hideAction } = this.state

    return (
      <View className="my">
        <View className="my-info-wrapper">
          <View className="my-info">
            <View className="user-avatar">
              <Image className="img" mode="widthFix" src={avatar} />
            </View>
            <Text className="user-name">KyleWang</Text>
          </View>
        </View>
        <View className="main-list">
          {this.mainList.map((item, index) => (
            <View className="item" key={index}>
              <Image src={item.icon} mode="aspectFit" className="icon" />
              <View className="text border-bottom-1px">{item.title}</View>
            </View>
          ))}
        </View>
        {/* 创建的歌单 */}

        {userCreatedDiscList.length ? <View className="disc-title">我创建的歌单</View> : ''}
        <View className="disc-list">
          {userCreatedDiscList.map(item => (
            <AtSwipeAction
              key={item.id}
              isClose={hideAction}
              onClick={this.showModal.bind(this, item.id)}
              options={this.actionOption}
            >
              <View className="item" onClick={this.toDetail.bind(this, item.id)}>
                <View className="image-wrapper">
                  <Image src={item.coverImgUrl} alt="" lazy-load mode="widthFix" className="img" />
                </View>
                <View className="desc-wrapper border-bottom-1px">
                  <Text className="text">{item.name}</Text>
                  <Text className="text count">{item.trackCount}首</Text>
                </View>
              </View>
            </AtSwipeAction>
          ))}
        </View>

        {/* 收藏的歌单 */}
        {userFavoriteDiscList.length ? <View className="disc-title">我收藏的歌单</View> : ''}

        <View className="disc-list">
          {userFavoriteDiscList.map(item => (
            <AtSwipeAction
              autoClose
              onClick={this.showModal}
              key={item.id}
              options={this.actionOption}
            >
              <View key={item.id} className="item" onClick={this.toDetail.bind(this, item.id)}>
                <View className="image-wrapper">
                  <Image src={item.coverImgUrl} alt="" lazy-load mode="widthFix" className="img" />
                </View>
                <View className="desc-wrapper border-bottom-1px">
                  <Text className="text">{item.name}</Text>
                  <Text className="text count">
                    {item.trackCount}首, by{item.creator.nickname}
                  </Text>
                </View>
              </View>
            </AtSwipeAction>
          ))}
        </View>

        {/* Modal */}
        <Modal isShow={showModal} onConfirm={this.modalConfirm} onCancel={this.modalCancel}>
          <View>确定要删除该歌单吗？</View>
        </Modal>
      </View>
    )
  }
}
