// pages/page2/newpage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg:"this is msg",
    id:"view1",
    a:1,b:2,c:3,
    array:[{message:"message1"},{message:"message2"}],
    eleColor:'red'
  },
  clickBlue: function(){
    this.setData({ eleColor:'blue'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '练习'
    })
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