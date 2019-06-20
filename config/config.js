const production = true; //是否为生产环境
const url = production ? 'https://www.ouchenfootball.cn' : 'http://10.100.115.179:8080'; //请求地址

export default {
  url, //请求地址
  static: `${url}/static/img`, //静态资源路径
}