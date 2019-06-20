import echarts from '../../components/data/ec-canvas/echarts.js';
import util from '../../utils/util.js';

let indicator = []; //雷达图条目
let seriesValue = []; //雷达图每项数据

Page({
  data: {
    static: util.config.static, //图片静态资源路径
    studentData: {}, //学员技能数据
    progressList: {}, //进度条数据
    positionData: {}, //位置数据
  },
  //初始化数据
  onLoad() {
    const studentData = wx.getStorageSync('userInfo').userBodyData;
    const progressList = initProgressList(studentData);
    indicator = [];
    seriesValue = [];
    progressList.forEach(item => {
      item.average = 0;
      indicator.push({
        name: item.title,
        max: 100
      });
      item.resData.forEach(itemChild => {
        item.average += itemChild.value;
        itemChild.styleColor = setStyleColor(itemChild.value);
      })
      seriesValue.push(Math.ceil(item.average / item.resData.length))
    });
    this.setData({
      progressList,
      studentData,
      positionData: initPositionData(studentData),
      ec: {
        onInit: initChart
      },
    });
  }
});

//初始化echarts
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    backgroundColor: "#ffffff",
    color: ["#FF9F7F"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator
    },
    series: [{
      type: 'radar',
      silent: true,
      data: [{
        value: seriesValue
      }]
    }]
  };
  chart.setOption(option);
  return chart;
}

//进度条数据
function initProgressList(studentData) {
  return [{
      title: "进攻",
      resData: [{
          name: "传中",
          value: studentData["cross"]
        },
        {
          name: "射门",
          value: studentData["shots"]
        },
        {
          name: "头球",
          value: studentData["head_home"]
        }
      ]
    },
    {
      title: "技巧",
      resData: [{
          name: "盘带",
          value: studentData["dribbling"]
        },
        {
          name: "弧线",
          value: studentData["arc"]
        },
        {
          name: "任意球",
          value: studentData["free_kick"]
        },
        {
          name: "长传",
          value: studentData["long_pass"]
        },
        {
          name: "控球",
          value: studentData["ball_control"]
        }
      ]
    },
    {
      title: "移动",
      resData: [{
          name: "加速",
          value: studentData["speed_up"]
        },
        {
          name: "速度",
          value: studentData["speed"]
        },
        {
          name: "敏捷",
          value: studentData["agility"]
        },
        {
          name: "反应",
          value: studentData["reaction"]
        },
        {
          name: "平衡",
          value: studentData["balance"]
        }
      ]
    },
    {
      title: "力量",
      resData: [{
          name: "射门力量",
          value: studentData["shooting_power"]
        },
        {
          name: "弹跳",
          value: studentData["bounce"]
        },
        {
          name: "耐力",
          value: studentData["endurance"]
        },
        {
          name: "强壮",
          value: studentData["strong"]
        },
        {
          name: "远射",
          value: studentData["long_shot"]
        }
      ]
    },
    {
      title: "心理",
      resData: [{
          name: "侵略性",
          value: studentData["aggressivity"]
        },
        {
          name: "拦截意识",
          value: studentData["Intercept_consciousness"]
        },
        {
          name: "跑位",
          value: studentData["positioning"]
        },
        {
          name: "视野",
          value: studentData["view"]
        },
        {
          name: "点球",
          value: studentData["penalty_kick"]
        }
      ]
    },
    {
      title: "防守",
      resData: [{
          name: "盯人",
          value: studentData["marking"]
        },
        {
          name: "抢断",
          value: studentData["stealing"]
        },
        {
          name: "铲球",
          value: studentData["tackling_tackles"]
        }
      ]
    },
    {
      title: "守门",
      resData: [{
          name: "鱼跃",
          value: studentData["fish_dive"]
        },
        {
          name: "手型",
          value: studentData["hand_shape"]
        },
        {
          name: "开球",
          value: studentData["open_ball"]
        },
        {
          name: "站位",
          value: studentData["stance"]
        },
        {
          name: "反应",
          value: studentData["response"]
        }
      ]
    }
  ]
}

//位置数据
function initPositionData(studentData) {
  const positionData = {
    left: [{
        name: "左边锋",
        value: studentData["left_wing"]
      },
      {
        name: "左中场",
        value: studentData["left_midfield"]
      },
      {
        name: "左翼卫",
        value: studentData["who_left"]
      },
      {
        name: "左后卫",
        value: studentData["left_quarter"]
      }
    ],
    center: [{
        name: "中锋",
        value: studentData["center_wing"]
      },
      {
        name: "影锋",
        value: studentData["secondstriker"]
      },
      {
        name: "前腰",
        value: studentData["short_loin"]
      },
      {
        name: "中前卫",
        value: studentData["centre_halfback"]
      },

      {
        name: "后腰",
        value: studentData["back_loin"]
      },
      {
        name: "中后卫",
        value: studentData["center_quarter"]
      },
      {
        name: "守门员",
        value: studentData["goalkeeper"]
      },
    ],
    right: [{
        name: "右边锋",
        value: studentData["right_wing"]
      },
      {
        name: "右中场",
        value: studentData["right_midfield"]
      },

      {
        name: "右翼卫",
        value: studentData["who_right"]
      },
      {
        name: "右后卫",
        value: studentData["right_quarter"]
      }
    ]
  }
  for (let key in positionData) {
    positionData[key].forEach(item => {
      item.background = setStyleColor(item.value);
    })
  }
  return positionData;
}

//设置样式颜色
function setStyleColor(num) {
  let color = '#999999';
  if (num >= 90) {
    color = '#ff0000';
  } else if (num >= 70) {
    color = '#f58323';
  } else if (num >= 60) {
    color = '#1075cb';
  }
  return color;
}