import util from '../../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    newsDetail: {}, //新闻详情
  },
  //初始化获取新闻详情
  onLoad(data) {
    util.get(`/home/news/info?id=${data.id}`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          newsDetail: res.data.data
        });
      }
    })
  },
})