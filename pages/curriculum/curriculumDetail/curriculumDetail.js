import util from '../../../utils/util.js'

Page({
  data: {
    static: util.config.static, //静态资源路径
    curriculumData: {}, //课程数据
    userInfo: {}, //用户信息
  },
  //初始化获取数据
  onShow() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
  },
  onLoad(data) {
    util.get(`/home/courses/info?course_id=${data.id}&school_id=${data.school_id}`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          curriculumData: res.data.data
        })
      }
    })
  },
  //购买课程
  payCurriculum() {
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
    util.post('/home/courses/enroll', {
      course_id: this.data.curriculumData.id
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
        const curriculumData = this.data.curriculumData;
        curriculumData.status = 1;
        this.setData({
          curriculumData
        })
      }
    })
  }
})