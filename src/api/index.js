import fly from './fly'
export default {
  // 获取banner
  getBanner: (params) => fly.get('banner'),

  // 获取推荐歌单
  getPersonalized: (params) => fly.get('personalized'),

  // 获取推荐歌单
  getNewsong: (params) => fly.get('personalized/newsong'),

  // 获取推荐歌单
  getToplist: (params) => fly.get('toplist'),

  // 用户创建的歌单
  getUserPlayList: (params) => fly.get('user/playlist?uid=36483413')
}
