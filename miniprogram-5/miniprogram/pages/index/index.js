 
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