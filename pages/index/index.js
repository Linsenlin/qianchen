import util from '../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    bannerImgs: [], //banner轮播数据
    searchText: '', //搜索内容
    activityList: [], //活动列表
    newsBanner: {}, //新闻头条banner
    newsList: [], //新闻头条列表
  },
  //初始化
  onShow() {
    //获取最新活动
    util.get(`/home/activity/list?page=1&pageSize=3`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          activityList: res.data.data.list
        })
      }
    })
    //获取新闻头条
    util.get(`/home/news/list?page=1&pageSize=3`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          newsBanner: res.data.data.list.splice(0, 1)[0],
          newsList: res.data.data.list
        })
      }
    })
    // 获取用户信息
    util.get('/home/user/info').then(res => {
      if (res.data.code === 0) {
        console.log(res.data.data)
        wx.setStorageSync('userInfo', res.data.data);
      }
    })
    //获取banner
    this.setBanner();
  },
  onShareAppMessage(res) {
    console.log(res)
  },
  //设置轮播图
  setBanner() {
    util.get(`/home/banner?page=1&pageSize=5&type=0`).then(res => {
      if (res.data.code === 0) {
        res.data.data.list.forEach(item => {
          item.url = `../curriculum/curriculumDetail/curriculumDetail?id=${item.course_id}`
          if (item.model === 2) {
            item.url = `../activity/activityDetail/activityDetail?id=${item.course_id}`
          } else if (item.model === 3) {
            item.url = `../news/newsDetail/newsDetail?id=${item.course_id}`
          }
        })
        this.setData({
          bannerImgs: res.data.data.list
        })
      }
    })
  }
})