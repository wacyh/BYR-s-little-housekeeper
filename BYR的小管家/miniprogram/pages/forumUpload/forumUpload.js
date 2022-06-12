const app = getApp()//获取url
Page({
  data: {
    content:'',
    title:'',
    img_arr: [],
    timeSymbol:0,//时间戳
    cloudLocation:'',//云端的位置
  },

  //获取时间戳，后期对图片上传路径唯一化
  onLoad:function(options){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    this.setData({
        timeSymbol:timestamp
    })
  },

  //点击发布后触发的函数
  formSubmit: function (e) {
    this.upload(e)//upload在下面定义了
  },

    //发表内容上传到云端
    upload: function (e) {
    var that=this
    if(that.data.img_arr[0]==null)//当用户不发图时
    {
        wx.cloud.database().collection("Forum")
        .add({
            data:{
                content: e.detail.value.content,   
                title: e.detail.value.title,
                cloudLocation:'',
                createTime:wx.cloud.database().serverDate(),
                userName:app.globalData.userName
            }
        })
        .then(res=>{
            console.log("不含图片的内容上传成功")
            wx.switchTab({
                url: '/pages/forumShow/forumShow',
            })
        })
        .catch(err=>{
            console.log("不含图片的内容上传失败")
        })
    }
    else{//当用户发图时
        setTimeout(() => {
        for (var i = 0; i < (this.data.img_arr.length); i++) {
        console.log(that.data.img_arr[0])
        wx.cloud.uploadFile({
            cloudPath:'example'+that.data.timeSymbol+'.png',
            filePath:that.data.img_arr[0],
            success:res=>{
                that.setData({
                    cloudLocation:res.fileID
                })
                console.log(that.data.cloudLocation)//照片在云端的地址
                console.log(app.globalData.userName)
                //将数据上传到云端
                wx.cloud.database().collection('Forum')
                .add({
                data:{
                    content: e.detail.value.content,   
                    title: e.detail.value.title,
                    cloudLocation:that.data.cloudLocation,
                    createTime:wx.cloud.database().serverDate(),
                    userName:app.globalData.userName
                }
                })
                .then(res=>{
                    console.log("含有图片的内容上传成功")
                    wx.showToast({
                      title: '发布成功',
                      icon:"success"
                    })
                    wx.switchTab({
                        url: '/miniprogram/pages/forumShow/forumShow',
                    })
                })
                .catch(err=>{
                    console.log("含有图片的内容上传失败")
                })
            },
            fail:err=>{
                console.log(err)
            }
        })
    }
    1000}
        )
    }
    },

    //选择图片
    upimg: function () {
        var that = this;
        if (this.data.img_arr.length  < 1) {
        wx.chooseImage({//选择图片
            count:1,//一张图片
            sizeType: ['original', 'compressed'],
            success: function (res) {
                console.log("成功获取照片",res)
            that.setData({
                img_arr: that.data.img_arr.concat(res.tempFilePaths)
            })
            }
        })
        
        } 
        },
});

