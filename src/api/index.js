import fly from './fly'
export default {
  // 获取banner
  getBanner: (params) => fly.get('banner'),

  // 获取推荐歌单
  getPersonalized: (params) => fly.get('personalized'),

  // 获取推荐歌单
  getNewsong: (params) => fly.get('personalized/newsong')
}
