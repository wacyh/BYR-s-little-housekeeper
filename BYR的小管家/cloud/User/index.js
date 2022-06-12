// 云函数入口文件
const cloud = require('wx-server-sdk')

wx.cloud.init({
    env:"cloud1-0gyrp3px115fdc8d"
})

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    return wx.cloud.database().collection('user')       
}