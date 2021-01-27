// miniprogram/pages/recommendSong/recommendSong.js
import {request} from '../../utils/util'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:[]
  }, 
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          // 跳转至登录界面
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      })
    }
      this.getSongList();
  },
  getSongList: async function(){
      let result = await request('/recommend/songs') 
      this.setData({
        songList:result.recommend
      })
      appInstance.globalData.songList=result.recommend
  },
  toDetail:function(e){
    let song=e.currentTarget.dataset.song;
    wx.navigateTo({
      //url: '../song/song?music='+JSON.ssong.idtringify(song),
      //但是因为接口给了可以直接用id的
      url: '../song/song?songId='+song.id,
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