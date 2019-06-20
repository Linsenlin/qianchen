import util from '../../utils/util.js'

Page({
  data: {
    campusInfo: {}, //当前校区信息
    curriculumList: [], //课程列表
    page: 1 //当前页码
  },
  //初始化数据
  onShow() {
    this.setData({
      campusInfo: wx.getStorageSync('campusInfo'),
      curriculumList: []
    })
    this.getCurriculum();
  },
  //获取校区课程
  getCurriculum() {
    util.get(`/home/courses/list?page=${this.data.page}&pageSize=10&school_id=${this.data.campusInfo.id}`).then(res => {
      if (res.data.code === 0) {
        const curriculumList = this.data.curriculumList;
        res.data.data.list.forEach(item => {
          curriculumList.push(item)
        })
        this.setData({
          curriculumList
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
    this.getCurriculum();
  },
})