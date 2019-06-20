import util from '../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    userInfo: {}, //用户信息
    schoolList: [], //校区列表
    schoolIndex: 0, //选择校区索引
  },
  //初始化
  onShow() {
    util.get(`/home/schools/list?page=1&pageSize=100`).then(res => {
      if (res.data.code !== 0) return;
      const schoolList = res.data.data.list
      this.setData({
        schoolList,
        userInfo: wx.getStorageSync('userInfo')
      });
      schoolList.forEach((item, schoolIndex) => {
        if (item.id === this.data.userInfo.school_id) {
          this.setData({
            schoolIndex
          })
        }
      })
    })
  },
  //选择性别
  selectSex(ev) {
    const userInfo = this.data.userInfo;
    userInfo.sex = ev.currentTarget.dataset.index
    this.setData({
      userInfo
    })
  },
  //输入框改变
  inputChange(ev) {
    const userInfo = this.data.userInfo;
    userInfo[ev.currentTarget.dataset.key] = ev.detail.value;
    this.setData({
      userInfo
    })
  },
  //选择校区
  selectSchool(ev) {
    const schoolIndex = Number(ev.detail.value);
    const userInfo = this.data.userInfo;
    userInfo.school_id = this.data.schoolList[schoolIndex].id
    this.setData({
      schoolIndex,
      userInfo
    });
  },
  //发送学员信息
  sendUserData() {
    util.post('/home/user/edit', this.data.userInfo).then(res => {
      if (res.data.code !== 0) return;
      wx.setStorageSync('userInfo', this.data.userInfo);
      util.showToast({
        title: '学员信息修改成功'
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../my/my'
        })
      }, 2000)
    })
  }
})