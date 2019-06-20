import util from '../../../utils/util.js'

Page({
  data: {
    static: util.config.static, //静态资源路径
    signInClassHourList: [], //已签到课时列表
  },
  //初始化
  onLoad(data) {
    util.get(`/home/user/called?course_id=${data.id}`).then(res => {
      if (res.data.code !== 0) return;
      console.log(res.data.data)
      this.setData({
        signInClassHourList: res.data.data
      })
    })
  },
})