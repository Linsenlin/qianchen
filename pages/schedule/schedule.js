Page({
  data: {
    page: 1 //页码
  },
  //星期状态改变
  changeWeek() {
    this.setData({
      page: 1
    });
  },
  //页面触底加载
  onReachBottom() {
    let page = this.data.page;
    page++
    this.setData({
      page
    });
  },
})