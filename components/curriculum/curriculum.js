import util from '../../utils/util.js';

Component({
  properties: {
    //课程列表
    curriculumList: {
      type: Array,
      value: []
    }
  },
  data: {
    static: util.config.static, //图片静态资源路径
  },
  methods: {}
})