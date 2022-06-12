// pages/homePage/homePage.js
const app = getApp()
Page({
    data: {
        myList:[]
    },
    onShow(){
        wx.cloud.database().collection('Forum')
        .orderBy('createTime','desc')
        .where({
            userName:app.globalData.userName
        })
        .get()
        .then(res=>{
            console.log("获取成功",res.data)
            this.setData({
                myList:res.data
            })
        })
        .catch(err=>{
            console.log("获取失败",err)
        })
    },

    thePost(){
        wx.navigateTo({
          url: '/miniprogram/pages/forumUpload/forumUpload',
        })
    }
})