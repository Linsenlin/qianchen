import util from "../../utils/util.js"

Page({
  data: {
    coachList: [], //教练列表
    campusInfo: '', //营区信息
    page: 1 //页码
  },
  //初始化获取数据
  onLoad() {
    this.setData({
      campusInfo: wx.getStorageSync('campusInfo')
    });
    this.getCoachList()
  },
  //获取教练列表
  getCoachList() {
    util.get(`/home/teachers/list?school_id=${this.data.campusInfo.id}&page=${this.data.page}&pageSize=10`).then(res => {
      if (res.data.code === 0) {
        const coachList = this.data.coachList;
        res.data.data.list.forEach(item => {
          coachList.push(item)
        })
        this.setData({
          coachList
        })
      }
    })
  },
  //下拉触底加载数据
  onReachBottom() {
    let page = this.data.page;
    page++;
    this.setData({
      page
    })
    this.getCoachList();
  },
})