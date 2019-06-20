import util from '../../utils/util.js';

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    tabsIndex: 0, //选项卡索引
    //订单数据
    orderForm: [{
      list: [],
      page: 1
    }, {
      list: [],
      page: 1
    }]
  },
  //初始化
  onLoad() {
    this.getOrderForm(0);
    this.getOrderForm(1);
  },
  //切换选项卡
  changeTabs(ev) {
    this.setData({
      tabsIndex: ev.currentTarget.dataset.index
    })
  },
  //获取列表
  getOrderForm(tabsIndex) {
    util.get(`/home/user/orders?page=${this.data.orderForm[tabsIndex].page}&pageSize=10&type=${tabsIndex}`).then(res => {
      if (res.data.code !== 0) return;
      const orderForm = this.data.orderForm;
      res.data.data.list.forEach(item => {
        item.id = item.course_id;
        orderForm[tabsIndex].list.push(item);
      })
      this.setData({
        orderForm
      })
    })
  },
  //下拉加载数据
  onReachBottom() {
    const orderForm = this.data.orderForm;
    const tabsIndex = this.data.tabsIndex
    orderForm[tabsIndex].page++;
    this.setData({
      orderForm
    })
    this.getOrderForm(tabsIndex);
  },
})