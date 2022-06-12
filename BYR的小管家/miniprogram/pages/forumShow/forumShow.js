var app = getApp();
Page({

    data: {
        forumList:[],   //页面帖子的数据
    },

    onShow: function () {
        //获取帖子数据
        var that = this
        wx.cloud.database().collection('Forum')
        .orderBy('createTime','desc')
        .get()
        .then(res=>{
            console.log(res)
            that.setData({
                forumList:res.data,   //将云端数据放到本地
            })
        })
        .catch(err=>{
            console.log("获取数据失败",err)
        })
    },

    // getLocalTime(date){
    //     var e=new Date(date)
    //     var x=e.getFullYear()+"年"+e.getMonth()+"月"+e.getDate()+"日"
    //     return x
    // }

})

