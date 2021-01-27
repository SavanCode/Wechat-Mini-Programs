// miniprogram/pages/song/song.js
import { request } from "../../utils/util";
Page({ 
  data: {
    currentWidth:30,
    playing:false,
    songContent:[],
    songUrl:''
  }, 
  onLoad: function (options) { 
    let songId=options.songId; 
    this.getSongContent(songId);
    this.getSongUrl(songId);
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
    this.setData({
       songContent:result.songs[0]
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
  playMusic(){
    console.log(this.data.songUrl)
    let backgroundAudioManager=wx.getBackgroundAudioManager()
    let {songUrl,songContent}= this.data
    if(this.data.playing){
      backgroundAudioManager.src = songUrl;
      backgroundAudioManager.title =  songContent.name;
    }else{
      backgroundAudioManager.pause();
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