import util from '../../utils/util.js';

Component({
  properties: {
    //页码
    page: {
      type: Number,
      value: 1,
      observer() {
        this.getSchedule();
      }
    },
    //每页的数量
    pageSize: {
      type: Number,
      value: 5
    }
  },
  data: {
    scheduleList: [], //日程列表
    weekList: ['日', '一', '二', '三', '四', '五', '六'], //周期
    weekDate: '', //当前周期的日期
    weekActive: 0, //当前选中
    week: 0, //今天星期几
    scheduleList: [], //当天日程安排
  },
  lifetimes: {
    //初始化
    attached() {
      const week = new Date().getDay()
      this.setData({
        weekActive: week,
        week,
        weekDate: this.getWeekDate(0)
      });
      this.getSchedule();
    },
  },
  methods: {
    //设置当天日期
    setWeekDate(ev) {
      const index = ev.currentTarget.dataset.index
      this.setData({
        page: 1,
        weekActive: index,
        scheduleList: [],
        weekDate: this.getWeekDate(index - this.data.week)
      });
      this.getSchedule();
      this.triggerEvent('changeWeek')
    },
    //获取当前日期日程
    getSchedule() {
      const school_id = wx.getStorageSync('campusInfo').id
      const data = `page=${this.data.page}&pageSize=${this.data.pageSize}&school_id=${school_id}&day=${this.data.weekDate}`;
      util.get(`/home/courses/someday?${data}`).then(res => {
        if (res.data.code === 0) {
          const scheduleList = this.data.scheduleList;
          res.data.data.list.forEach(item => {
            scheduleList.push(item)
          })
          this.setData({
            scheduleList
          })
        }
      })
    },
    //初始化当前日期
    getWeekDate(day) {
      const dateTime = Date.now();
      const dayTime = 24 * 60 * 60 * 1000;
      return util.getDate(dateTime + dayTime * day);
    },
  }
})