import util from '../../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    page: 1, //页码
    campusList: [], //校区列表
    campusInfo: {}, //当前校区信息
  },
  //初始化
  onShow() {
    const campusInfo = wx.getStorageSync('campusInfo');
    if (campusInfo) {
      this.setData({
        campusInfo
      });
    }
    this.getCampusList(campusInfo);
  },
  //获取校区列表
  getCampusList(campusInfo = true) {
    util.get(`/home/schools/list?page=${this.data.page}&pageSize=10`).then(res => {
      if (res.data.code === 0) {
        const campusList = this.data.campusList;
        res.data.data.list.forEach(item => {
          campusList.push(item);
        })
        this.setData({
          campusList
        });
        if (!campusInfo) {
          this.setData({
            campusInfo: campusList[0]
          });
          wx.setStorageSync('campusInfo', campusList[0]);
        }
      }
    })
  },
  //选择校区
  selectCampus(ev) {
    wx.setStorageSync('campusInfo', ev.currentTarget.dataset.campus);
    wx.navigateBack({
      delta: 1
    })
  },
  //下拉加载数据
  onReachBottom() {
    let page = this.data.page;
    page++;
    this.setData({
      page
    })
    this.getCampusList();
  },
})