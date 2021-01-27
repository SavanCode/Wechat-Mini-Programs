// miniprogram/pages/song/song.js
import { request } from "../../utils/util";
import {formatDuring} from "../../utils/time";
// import moment from 'moment'; 这个真的麻烦 不弄了 直接写 
var appInstance = getApp();
Page({ 
  data: {
    currentWidth:30,
    playing:false,
    songContent:[],
    songUrl:'',
    durationTime:'00:00',
    currentTime:'03:00',
  }, 
  onLoad: function (options) { 
    let songId=options.songId; 
    this.getSongContent(songId);
    this.getSongUrl(songId);
    this.backgroundAudioManager=wx.getBackgroundAudioManager()

    // 判断当前页面音乐是否在播放
    if(appInstance.globalData.musicOn && appInstance.globalData.musicId === songId){
      // 修改当前页面音乐播放状态为true
      this.setData({
        playing: true
      })
    }
   
    // 监视音乐播放/暂停/停止
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true);
      // 修改全局音乐播放的状态
      appInstance.globalData.musicId = songId;
    });
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false);
    });
  }, 
  changePlayState(state){
    // 修改音乐是否的状态
    this.setData({
      playing:state
    })
    appInstance.globalData.musicOn=state
  },
  getSongUrl: async function(id){
    let result= await request('/song/url',{id}) 
    this.setData({
      songUrl:result.data[0].url
    })
    console.log("setting url",this.data)
  }
  , 
  getSongContent: async function(id){
    let result= await request('/song/detail',{ids:id})
    console.log("song content",result.songs[0])
    let dt= result.songs[0].dt;
    let {minutes , seconds }=formatDuring(dt)
    //console.log(parseInt(minutes),parseInt(seconds)) 
    this.setData({
       songContent:result.songs[0],
       durationTime:"0"+parseInt(minutes)+":"+parseInt(seconds)
    }) 
    wx.setNavigationBarTitle({
      title: this.data.songContent.name+"   "+this.data.songContent.ar[0].name
    })
  }, 
  controlMusic:function(){
    this.setData({
      playing:!this.data.playing
    }) 
    this.playMusic()
  },
  //这里换成全局判断是为了系统控制不会冲撞
  playMusic(){
    console.log(this.data.songUrl)
    let {songUrl,songContent}= this.data
    if(this.data.playing){
      this.backgroundAudioManager.src = songUrl;
      this.backgroundAudioManager.title =  songContent.name;
    }else{
      this.backgroundAudioManager.pause();
    }
  },
  pre:function(){
    //console.log(appInstance)
    let currentIndex=appInstance.globalData.songList.findIndex(item=>item.id===this.data.songContent.id)
    if(currentIndex===0){
      wx.showToast({
        title: '前面没有歌曲了',
      })
    }
    let preId=appInstance.globalData.songList[currentIndex-1].id
    wx.redirectTo({
      url: '../song/song?songId='+preId,
    })
  
  },next:function(){
    let currentIndex=appInstance.globalData.songList.findIndex(item=>item.id===this.data.songContent.id)
    if(currentIndex===appInstance.globalData.songList.length){
      wx.showToast({
        title: '后面没有歌曲了',
      })
    }
   let nextId=appInstance.globalData.songList[currentIndex+1].id
    wx.redirectTo({
      url: '../song/song?songId='+nextId,
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