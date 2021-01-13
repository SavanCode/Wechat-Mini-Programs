// miniprogram/lianxi/duanzi.js
const DB = wx.cloud.database().collection("testlist")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addData(){
    console.log('调用添加数据的方法')
    DB.add({
      data:{
        name:'panda bear',
        price:9999
      },
      success(res) {
        console.log("成功", res)
      },
      fail(res) {
        console.log("失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})