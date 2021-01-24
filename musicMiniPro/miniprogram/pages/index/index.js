// miniprogram/pages/index/index.js
import { request } from "../../utils/util";
Page({ 
  data: {
    bannerList:[],
    recommendList:[],//albumList-scroll
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      let bannerList= await request('/banner',{type:2});
      //console.log("结果",result.banners)
      this.setData({
        bannerList:bannerList.banners
      })
      ///personalized
      let personalized= await request('/personalized');
      this.setData({
        recommendList:personalized.result
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