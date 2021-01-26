// miniprogram/pages/video/video.js 
import { request } from "../../utils/util";
Page({
  data: {
    navList:[],
    choseNav:0,
    videoList:[],
    choseVideo:0,
    isRefresh:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) { 
    this.getNavItem();
  },
  // 从后端获取nav数据
  getNavItem:async function(){
    let result= await request('/video/group/list');
    this.setData({
      navList : result.data.splice(0,15),
      choseNav: result.data[0].id
    })  
   this.getContentNav(this.data.choseNav);
  },
  // 更新下面内容
  getContentNav: async function(id){ 
    if(!id){
      return false ;
    }
  let result= await request('/video/group',{id});
    //console.log(result)
    wx.hideLoading({
    })
    //还没做完cookie的话 先comment 
    if(result.code="301"){
      wx.showToast({
        title: '请先登录哦~',
        icon: 'none'
      }) 
      // wx.redirectTo({
      //   url: '/pages/login/login',
      // })console.log()
    } 
    console.log("更新video列表",result)
    if(result.datas.length===0){
      wx.showToast({
        title: '暂无推荐的视频~',
        icon: 'none'
      })  
    }else{
      wx.showToast({
        title: '刷新完成~',
        icon: 'none'
      })
      //先用http://localhost:3000/video/group?id=9104
      this.setData({
        videoList:result.datas,
        isRefresh:false
      })  
    } 
  },
  // 动态选择上面navitem 更换内容
  changeNav:function(e){ 
    this.setData({
      choseNav:e.target.id >>>0,
      videoList:[],
      choseVideo:0,
    })
    //console.log(this.data)
    wx.showLoading({
      title: '努力加载中~',
    })
    this.getContentNav(e.target.id >>>0)
  }, 
  // video列表，实现同一时间只能播放一个视频
/*  playVideo(e) {
    var curIdx = e.currentTarget.id;
    // 没有播放时播放视频
    // console.log(curIdx)
    if (!this.data.indexCurrent) {
      this.setData({
        indexCurrent: curIdx
      })
      var videoContext = wx.createVideoContext(curIdx, this) //这里对应的视频id
      videoContext.play()
    } else { // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.indexCurrent)//this是在自定义组件下，当前组件实例的this，以操作组件内 video 组件（在自定义组件中药加上this，如果是普通页面即不需要加）
      if (this.data.indexCurrent != curIdx) {
        console.log(123)
        videoContextPrev.pause()
        this.setData({
          indexCurrent: curIdx
        })
        var videoContextCurrent = wx.createVideoContext(curIdx, this)
        videoContextCurrent.play()
      }
    } 
  },*/
  // 性能优化 先放img替代video 以防视频加载，用户体验不好
  playVideoImg: function(e){ 
    let vid=e.target.id
    this.setData({
      choseVideo:vid
    }) 
    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    this.videoContext.play();
  },
  handleRefresher:function(){ 
      //console.log('scroll-view 下拉刷新');
      // 再次发请求，获取最新的视频列表数据
      this.getContentNav(this.data.choseNav);
  },
  scrolltolower: async function(){
    //先用http://localhost:3000/video/group?id=9104
    //因为网易云api没有分页
    let result= await request('/video/group',{id:9104});
    console.log(result.datas)
    if(result.datas.length===0){
      wx.showToast({
        title: '没有更多类似视频~',
        icon: 'none'
      })  
    }else{  
      let videoList=this.data.videoList
      let newVideoList=result.datas
      videoList.push(...newVideoList)
      this.setData({
        videoList:videoList
      })  
    } 
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