import util from '../../utils/util.js'

Page({
  data: {
    newsList: [], //新闻列表
    page: 1, //页码
    school_id: '', //校区id
  },
  //初始化获取新闻列表
  onLoad(data) {
    this.setData({
      school_id: data.id
    })
    this.getNewsList();
  },
  //获取新闻列表
  getNewsList() {
    util.get(`/home/news/list?page=${this.data.page}&pageSize=10&school_id=${this.data.school_id}`).then(res => {
      if (res.data.code === 0) {
        const newsList = this.data.newsList;
        res.data.data.list.forEach(item => {
          newsList.push(item);
        })
        this.setData({
          newsList
        })
      }
    })
  },
  //下拉加载数据
  onReachBottom() {
    let page = this.data.page;
    page++;
    this.setData({
      page
    })
    this.getNewsList();
  },
})