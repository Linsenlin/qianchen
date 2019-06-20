import util from '../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    userInfo: {} //用户信息
  },
  //初始化
  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
})