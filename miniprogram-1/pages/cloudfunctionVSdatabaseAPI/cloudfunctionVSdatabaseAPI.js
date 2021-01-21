// pages/cloudfunctionVSdatabaseAPI/cloudfunctionVSdatabaseAPI.js
Page({
  databse:function(){
    wx.cloud.database().collection("testlist").get({
      success(res) {
        console.log("数据库API获取数据成功！", res)
      },
      fail(res) {
        console.log("数据库API获取数据失败！", res)
      }
    })
  },
  cloudFunction:function(){
    wx.cloud.callFunction({
      name:"cloudfunctionVSdatabaseAPI",
      success(res) {
        console.log("云函数获取数据成功！", res)
      },
      fail(res) {
        console.log("云函数获取数据失败！", res)
      }
    })
  }
})