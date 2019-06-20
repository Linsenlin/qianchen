import util from '../../utils/util.js'

Page({
  data: {},
  //检查用户授权
  onLoad() {
    wx.showLoading({
      title: '授权登录中...',
    })
    new Promise(resolve => {
      wx.getSetting({
        success(res) {
          resolve(res);
        }
      })
    }).then(res => {
      if (res.authSetting['scope.userInfo']) {
        this.login();
      } else {
        wx.hideLoading();
      }
    })
  },
  //监听用户授权
  getUserInfo(data) {
    if (data.detail.userInfo) {
      this.login();
      wx.showLoading({
        title: '授权登录中...',
      })
    }
  },
  //用户登录并获取用户信息
  login() {
    new Promise(resolve => {
      wx.login({
        success: res => {
          resolve(res);
        }
      })
    }).then(login => {
      return new Promise(resolve => {
        wx.getUserInfo({
          success: res => {
            resolve({
              code: login.code,
              nickname: res.userInfo.nickName,
              avatar: res.userInfo.avatarUrl
            })
          }
        })
      })
    }).then(sendData => {
      return util.post('/login', sendData);
    }).then(res => {
      wx.hideLoading();
      if (res.data.code === 0) {
        wx.setStorageSync('token', res.data.token);
        wx.switchTab({
          url: '../index/index'
        })
      }
    })
  }
})