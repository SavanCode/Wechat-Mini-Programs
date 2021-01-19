// index.js
// 获取应用实例
// const app = getApp()
// const global=app.globalData.userInfo
// Page({
//   data: { 
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   goIndex(){
//     wx.navigateTo({
//     url:"/pages/page2/newpage"
//     })
// },
//   // 事件处理函数
//   bindViewTap() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad() {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse) {
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })

 
Page({
  data: {
    list:[]
    },
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '头条'
      })
      wx.request({
        url: 'https://unidemo.dcloud.net.cn/api/news',
        data: {
          format : 'json',
          // maxId : this.data.maxId,
          // categoryId : this.data.cateid,
          // pageCounts : 10
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          //1:在控制台打印一下返回的res.data数据
          console.log(res.data)
          var newsData = res.data;
          //2:在请求接口成功之后，用setData接收数据
          this.setData({
            //第一个data为固定用法
            list: newsData
          })
        },
        fail:function(){
          //fail
          wx.showToast({
            title: '服务器连接失败',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
            success: (result)=>{},
            fail: ()=>{},
            complete: ()=>{}
          });
        },
        complete: function(){
          //complete
        }
      })
    },
    goDetail:function(e){
      var news = e.currentTarget.dataset.news;   
      console.log(news.post_id);
      wx.navigateTo({
        url:"../detail/index?id=" + news.post_id//注意相对位置
        }) 
    },
    onReachBottom: function () {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{},
        fail: ()=>{},
        complete: ()=>{}
      });
    }, 
})