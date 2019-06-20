import util from '../../../utils/util.js';

Component({
  properties: {
    //评分
    grade: {
      type: Number,
      value: 0
    }
  },
  data: {
    static: util.config.static, //图片静态资源路径
  },
  methods: {}
})