import util from '../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    bannerImgs: [], //banner轮播数据
    campusInfo: {}, //当前校区信息
    curriculumList: [], //课程列表
    newsBanner: {}, //营区学员头条banner
    newsList: [], //营区学员头条列表
    mainTeacher: {}, //主教练
    teacherList: [], //其他教练
  },
  //初始化数据
  onShow() {
    //获取营区信息
    const campusInfo = wx.getStorageSync('campusInfo');
    if (!campusInfo) {
      wx.navigateTo({
        url: './selectCampus/selectCampus'
      });
      return;
    }
    this.setData({
      campusInfo
    });

    this.initData(campusInfo.id);
  },
  //请求营区数据
  initData(id) {
    //获取轮播数据
    util.get(`/home/banner?page=1&pageSize=5&type=1&school_id=${id}`).then(res => {
      if (res.data.code === 0) {
        res.data.data.list.forEach(item => {
          item.url = `../curriculum/curriculumDetail/curriculumDetail?id=${item.course_id}`
          if (item.model === 3) item.url = `../news/newsDetail/newsDetail?id=${item.course_id}`;
        })
        this.setData({
          bannerImgs: res.data.data.list
        })
      }
    });
    //获取教练
    util.get(`/home/teachers/list?page=1&pageSize=4&school_id=${id}`).then(res => {
      if (res.data.data.list.length === 0) {
        this.setData({
          mainTeacher: {}
        });
        return
      }
      if (res.data.code === 0) {
        this.setData({
          mainTeacher: res.data.data.list.splice(0, 1)[0],
          teacherList: res.data.data.list
        })
      }
    });
    //获取校区课程
    util.get(`/home/courses/list?page=1&pageSize=3&school_id=${id}`).then(res => {
      if (res.data.code === 0) {
        this.setData({
          curriculumList: res.data.data.list
        })
      }
    });
    //获取校区新闻头条
    util.get(`/home/news/list?page=1&pageSize=3&school_id=${id}`).then(res => {
      if (res.data.code === 0 && res.data.data.list.length > 0) {
        this.setData({
          newsBanner: res.data.data.list.splice(0, 1)[0],
          newsList: res.data.data.list
        })
      }
    })
  },

})