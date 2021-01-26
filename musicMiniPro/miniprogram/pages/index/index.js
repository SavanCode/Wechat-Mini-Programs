// miniprogram/pages/index/index.js
import { request } from "../../utils/util";
Page({ 
  data: {
    bannerList:[],
    recommendList:[],//albumList-scroll
    topList:[]
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
      //musicRankList 这里我们需要请求5次
      let index=0;
      let result=[];
      while(index<5){ 
        let musicRank= await request('/top/list',{idx:index++});
        let topListItem={name:musicRank.playlist.name,tracks:musicRank.playlist.tracks.slice(0,3)}
        result.push(topListItem);
        this.setData({
          topList:result
        })}
        //console.log("result",result)
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