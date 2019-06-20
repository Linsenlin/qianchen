import util from '../../utils/util.js'

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    //选项卡按钮
    tabsBtn: [{
        text: '全部',
        status: 0
      },
      {
        text: '报名中',
        status: 1
      },
      {
        text: '已结束',
        status: 2
      }
    ],
    tabsIndex: 0, //选项卡当前索引
    activityList: [
      //所有活动
      {
        page: 1,
        list: []
      },
      //进行中的活动
      {
        page: 1,
        list: []
      },
      //结束的活动
      {
        page: 1,
        list: []
      }
    ],
  },
  //初始化
  onLoad() {
    this.getActivityList(0);
    this.getActivityList(1);
    this.getActivityList(2);
  },
  //切换选项卡
  changeTabs(ev) {
    this.setData({
      tabsIndex: ev.currentTarget.dataset.index
    })
  },
  //获取活动列表
  getActivityList(index) {
    util.get(`/home/activity/list?status=${this.data.tabsBtn[index].status}&page=${this.data.activityList[index].page}&pageSize=10`).then(res => {
      if (res.data.code === 0) {
        console.log(res.data)
        const activityList = this.data.activityList;
        res.data.data.list.forEach(item => {
          activityList[index].list.push(item)
        })
        this.setData({
          activityList
        })
      }
    })
  },
  //下拉加载数据
  onReachBottom() {
    const activityList = this.data.activityList;
    const index = this.data.tabsIndex;
    activityList[index].page++;
    this.getActivityList(index);
  },
})