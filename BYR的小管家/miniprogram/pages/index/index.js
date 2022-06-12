//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName:0,
    password:0
  },
 
 
  // 获取输入账号 
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
    //console.log(this.data.userName)
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    //console.log(this.data.password)
  },
 
  // 登录处理
  login: function () {
    var that = this;
    if (this.data.userName.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
        wx.cloud.database().collection("user")
        .where({
            userName:this.data.userName
        })
        .get()
        .then(res=>{
            if(this.data.password==res.data[0].password)
            {
                app.globalData.userName=res.data[0].userName
                wx.switchTab({
                  url: '/miniprogram/pages/homePage/homePage',
                })
            }
            else
            {
                wx.showToast({
                  title: '密码错误',
                  icon:'error'
                })
            }
        })
        .catch(err=>{
            wx.showToast({
              title: '账号错误或未注册',
              icon:'error'
            })
        })
    }
  }
})
 