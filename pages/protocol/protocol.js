import util from "../../utils/util.js"

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    userInfo: '', //用户数据
  },
  //初始化
  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  //同意签约
  agree() {
    new Promise(resolve => {
      wx.showModal({
        title: '提示',
        content: '签约将不能取消',
        success: res => {
          if (res.confirm) {
            resolve();
          }
        }
      })
    }).then(() => {
      return util.post('/home/user/deal');
    }).then(res => {
      if (res.data.code === 0) {
        const userInfo = this.data.userInfo
        userInfo.deal = 1
        this.setData({
          userInfo
        });
        wx.setStorageSync('userInfo', userInfo);
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})