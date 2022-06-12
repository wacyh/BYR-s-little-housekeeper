// pages/register/register.js
wx.cloud.init({
    env:"cloud1-0gyrp3px115fdc8d"
})
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
    },
 
    // 获取输入密码 
    passwordInput: function (e) {
        this.setData({
        password: e.detail.value
        })
    },

    //注册
    Register()
    {
        //判断账号长度是否合适
        if(this.data.userName.length!=11)
        {
            wx.showToast({
              title: '账号位数不正确',
              icon:'error'
            })
            return
        }
        //从数据库中获取账号信息，无论是否存在都会返回data,区别在于data是否为空
        wx.cloud.database().collection('user')
        .where({
            userName:this.data.userName
        })
        .get()
        //从数据库中获取数据成功
        .then(res=>{
            console.log("get data successfully",res)
            //data为空，未注册
            if(res.data.length==0)
            {
                console.log("not register")
                //开始注册
                wx.cloud.database().collection('user')
                .add({
                    data:{
                        userName:this.data.userName,
                        password:this.data.password
                    }
                })
                .then(res=>{
                    console.log("register successfully ")
                    wx.showToast({
                    title: '注册成功',
                    })
                    wx.navigateTo({
                      url: '/miniprogram/pages/index/index',
                    })
                })
                .catch(err=>{
                    console.log("fall to register")
                })
            }
            //data非空，已经注册
            else
            {
                console.log("have registered")
                wx.showToast({
                  title: '重复注册',
                  icon:'none'
                })
            }
        })
        //从数据库中获取数据失败
        .catch(err=>{
            console.log("fail to get data")
        })
    }
})

