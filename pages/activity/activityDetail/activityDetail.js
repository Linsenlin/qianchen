import util from '../../../utils/util.js';

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    userInfo: {}, //用户信息
    activityDetail: {}, //活动详情
  },
  //初始化
  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
  },
  onLoad(data) {
    util.get(`/home/activity/info?id=${data.id}`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          activityDetail: res.data.data
        })
      }
    })
  },
  //报名
  nowSignUp() {
    if (!this.data.userInfo.deal) {
      util.showToast({
        title: '请先去勾选协议'
      });
      setTimeout(() => {
        wx.navigateTo({
          url: '../../protocol/protocol'
        })
      }, 2000)
      return;
    }
    wx.showLoading({
      title: '跳转支付中...',
    })
    util.post('/home/activity/enroll', {
      id: this.data.activityDetail.id
    }).then(res => {
      if (res.data.code === 0) {
        return util.post('/home/pay/order', {
          order_id: res.data.data
        })
      }
    }).then(res => {
      wx.hideLoading();
      if (res.data.code === 0) this.pay(res.data.data);
    })
  },
  //支付请求
  pay(res) {
    wx.requestPayment({
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonceStr,
      'package': res.package,
      'signType': res.signType,
      'paySign': res.paySign,
      success: () => {
        const activityDetail = this.data.activityDetail;
        activityDetail.status = 1;
        this.setData({
          activityDetail
        })
      }
    })
  }
})