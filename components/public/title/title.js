import util from '../../../utils/util.js';

Component({
  properties: {
    //图标
    icon: {
      type: String,
      value: '',
    },
    //标题
    text: {
      type: String,
      value: '',
    },
    //路径
    url: {
      type: String,
      value: '',
    }
  },
  data: {
    static: util.config.static, //图片静态资源路径
  },
  methods: {

  }
})