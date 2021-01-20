// pages/getopenid/getopenid.js 
Page({
  onLoad(){
    wx.cloud.callFunction({
      name:"getopenid",
      data:{

      },
      success(res) {
        console.log("获取openid成功！", res)
        console.log("openid是：", res.result.openid)
      },
      fail(res) {
        console.log("获取openid失败！", res)
      }
    })
  }
})