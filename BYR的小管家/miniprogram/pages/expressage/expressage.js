//index.js
const app = getApp()

Page({
  data: {
    OrderNo:'',
    express:[],
    TimeContext:[],
    show:false
  },
  btnClick: function (options) {
    var that = this;
    app.getExpressInfo(that.data.OrderNo, function(data) {
      console.log(data.showapi_res_body.data)
      var logo="express[0].logo"
      var expTextName="express[0].expTextName"
      var mailNo="express[0].mailNo"
      var tel="express[0].tel"
      that.setData({
        express: data.showapi_res_body.data,//格式转换*谨记
        [logo]:data.showapi_res_body.logo,
        [expTextName]:data.showapi_res_body.expTextName,
        [mailNo]:data.showapi_res_body.mailNo,
        [tel]:data.showapi_res_body.tel,
        TimeContext:data.showapi_res_body.data,
        show:true
      })
      console.log(that.data.express[0].time)
    });
  },
  onLoad: function() {
   
  },
  //输入框输入订单号后赋值
  input: function(e) {
    console.log(e.detail.value)
    this.setData({
      OrderNo: e.detail.value
    })
},
 

})


