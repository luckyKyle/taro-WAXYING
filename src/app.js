import Taro, { Component } from '@tarojs/taro'
import Index from './pages/recommend'

import './common/stylus/index.styl'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/recommend/recommend', // 推荐
      'pages/rank/rank', // 排行
      'pages/mv/mv', // MV
      'pages/user/user', // 用户
      'pages/search/search', // 搜索
      'pages/disc-detail/disc-detail', // 歌单详情
      'pages/play/play', // 播放器
    ],
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#d81e06',
      navigationBarBackgroundColor: '#d81e06',
      navigationBarTitleText: 'Ting',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#707070', // 底部bar字体颜色
      selectedColor: '#d81e06', // 字体选中颜色
      backgroundColor: '#fff', // bar整体背景颜色
      borderStyle: 'black', // bar上方border颜色
      position: 'bottom',
      list: [
        {
          pagePath: 'pages/recommend/recommend',
          text: '推荐',
          iconPath: 'static/images/tab-recommend-blur.png',
          selectedIconPath: 'static/images/tab-recommend.png'
        },
        {
          pagePath: 'pages/rank/rank',
          text: '排行榜',
          iconPath: 'static/images/tab-rank-blur.png',
          selectedIconPath: 'static/images/tab-rank.png'
        },
        {
          pagePath: 'pages/mv/mv',
          text: 'MV',
          iconPath: 'static/images/tab-mv-blur.png',
          selectedIconPath: 'static/images/tab-mv.png'
        },
        {
          pagePath: 'pages/user/user',
          text: '我的',
          iconPath: 'static/images/tab-user-blur.png',
          selectedIconPath: 'static/images/tab-user.png'
        }
      ]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
