import fly from './fly'

export default {
  // TODO 推荐:
  // 获取banner
  getBanner: params => fly.get('banner'),

  // 获取推荐歌单
  getPersonalized: params => fly.get('personalized'),

  // 获取推荐歌曲
  getNewsong: params => fly.get('personalized/newsong'),

  // 获取推荐MV
  getPersonalizedMv: params => fly.get('personalized/mv'),

  // TODO 歌单
  getDiscDetail: params => fly.get('playlist/detail', params),

  // TODO 歌曲
  // 获取歌曲详情
  getSongDetail: params => fly.get('/song/detail', params),

  // /song/detail?ids=347230

  // TODO MV
  // 获取MV 排行
  getMvList: params => fly.get('top/mv?limit=15&offset=1', params),

  // 获取MV 数据
  getMvDetail: params => fly.get('/mv/detail', params),

  // TODO 排行榜
  // 获取推荐歌单
  getToplist: params => fly.get('toplist', params),

  // TODO 用户:
  // 用户创建的歌单
  getUserPlayList: params => fly.get('user/playlist?uid=36483413&timestamp=1503019930000')
}
