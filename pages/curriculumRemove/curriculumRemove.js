import util from '../../utils/util.js'

Page({
  data: {
    page: 1, //页码
    curriculumList: [], //课时
  },
  onShow() {
    this.setData({
      curriculumList: []
    })
    this.getcurriculumList()
  },
  //获取列表
  getcurriculumList() {
    util.get(`/home/user/orders?page=${this.data.page}&pageSize=10&type=0`).then(res => {
      if (res.data.code !== 0) return;
      console.log(res.data.data)
      const curriculumList = this.data.curriculumList;
      res.data.data.list.forEach(item => {
        curriculumList.push(item);
      })
      this.setData({
        curriculumList
      })
    })
  },
  //下拉触底加载数据
  onReachBottom() {
    let page = this.data.page;
    page++;
    this.setData({
      page
    })
    this.getcurriculumList();
  },
})