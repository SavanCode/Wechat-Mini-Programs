// pages/getopenid/getopenid.js 
Page({
  onLoad(){
  },
  getopenid:function(){
    wx.cloud.callFunction({
      name:"getopenid",
      data:{ 
      },
      success(res) {
        console.log("获取openid成功！所有返回数据：", res)
        console.log("openid是：", res.result.openid)
        console.log("appid是：", res.result.appid)
      },
      fail(res) {
        console.log("获取openid失败！", res)
      }
    })
  }
})