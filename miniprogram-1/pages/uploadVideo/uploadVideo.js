//pages/uploadVideo/uploadVideo.js 
var app = getApp()
var count = 0;
Page({
  data: {
    chooesVideo:'',    //上传视频地址
    tipHide: false,
    chooseTypeHide: true,
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    console.log(options.status)
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('prew_video');
  },
  /*上传图片*/
  chooseImg:function() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        that.data.images = tempFilePaths
        // 多图片
        // that.data.urls = that.data.urls.concat(tempFilePaths)
        // 单图片
        that.data.urls = tempFilePaths[0]
        that.setData({
          images: tempFilePaths[0],
          urls: that.data.urls
        })
      }
    })
  },
  /*上传视频*/
  chooseVideo:function(){
    let that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          chooesVideo: res.tempFilePath
        })
        console.log("选择上传",that.data.chooesVideo) 
      } 
    })
  },
  uploadVideo:function(){ 
    let that=this;
    console.log("准备上传",that.data.chooesVideo)
    let temUrl= that.data.chooesVideo
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() +'.mp4',    //防止文件名重复，使用时间戳
      filePath: temUrl, // 文件路径
      success: res => {
        // get resource ID
        console.log("上传成功",res) 
        that.setData({
          chooesVideo: ''
        })
      },
      fail: err => {
        // handle error
        console.log("上传失败",res)
      }
    })
  },

  /* 全屏改变 */
  bindVideoScreenChange: function (e) {
    var status = e.detail.fullScreen;
    var play = {
      playVideo: false
    }
    if (status) {
      play.playVideo = true;
    } else {
      this.videoContext.pause();
    }
    this.setData(play);
  }

})