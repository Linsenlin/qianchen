import util from "../../../utils/util.js"

Page({
  data: {
    coachData: {} //教练数据
  },
  //获取教练详情数据
  onLoad(data) {
    util.get(`/home/teachers/info?id=${data.id}`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          coachData: res.data.data
        })
      }
    })
  },
})