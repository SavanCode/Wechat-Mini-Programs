// miniprogram/pages/user/user.js
import { request } from "../../utils/util";
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
Page({ 
  data: {
    // 拉动事件
    coverTransform: 'translateY(0)',
    coveTransition: '',
    //获得用户数据
    userInfo: {},  
    recentPlayList: [], 
  }, 
  onLoad: function (options) { 
     let userInfo = wx.getStorageSync('userInfo');
     if(userInfo){  
       this.setData({
         userInfo: JSON.parse(userInfo)
       })
        
       this.getUserRecentPlayList(this.data.userInfo.userId)}
  },
  handleTouchStart(event){
    this.setData({
      coveTransition: ''
    })
    // 获取手指起始坐标
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    
    if(moveDistance <= 0){
      return;
    }
    if(moveDistance >= 80){
      moveDistance = 80;
    }
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  
  handleTouchEnd(){
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },  
  // 获取用户播放记录的功能函数
  getUserRecentPlayList: async function(userId){
    let recentPlayListData = await request('/user/record', {uid: userId, type: 0});
    console.log(recentPlayListData)
    let recentPlayList = recentPlayListData.allData.splice(0, 10);
    //let index = 0;
    // let recentPlayList = recentPlayListData.allData.splice(0, 10).map(item => {
    //   item.id = index++;
    //   return item;
    // })
    this.setData({
      recentPlayList
    })
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
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