const DB = wx.cloud.database().collection("newteo2_newlist")
const pageOptions = {
  data: {
    id:0,//news post_id
    myrich:'',
    content:'',//current news content 
    collected:false,
  }, 
  onLoad(e) { 
    wx.setNavigationBarTitle({
      title: '热点文章'
    }); 
    var that = this; // this 指向性的问题
    that.setData({
      id: e.id
    });
   this.checkCollected(e.id);
   this.getContent(e.id)
  },
  checkCollected:function(id){
    var that = this; // this 指向性的问题
    DB.where({ id:id }).get({
      success(res) { 
        if(res.data.length!==0){ 
          that.setData({
          collected:true
        })  
        }   
      }
    })
  }
  ,
  getContent:function(id){
    wx.showLoading({
      title: '加载中',
    });
    var that = this; // this 指向性的问题
    wx.request({
      url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) { //请求成功 
        //var res = JSON.parse(res.data); 这里的数据不用
        that.setData({
          content: res.data,
          myrich : res.data.content
        })
      },
      fail: function () {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function () { //请求完成的时候，不管请求成功还是失败
        wx.hideLoading();
      }
    })
  },
  onShareAppMessage: function () {
    let that=this;
    return {
      title: '小程序名称',  //分享时缩略图的名称
      path: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + that.data.id,
      success: (res) => {
        // 分享成功
      },
      fail: (res) => {
        // 分享失败
      }
    }
  }
  ,
  liked:function(){
    var that=this;
    that.setData({
      collected:!that.data.collected
    })
    if(that.data.collected){//true
      //adding
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      })
      DB.add({
        data: {
          collected:true,
          id:that.data.id,
          content:that.data.content
        },
        success(res) {
          console.log("添加数据成功", res)
        },
        fail(res) {
          console.log("添加数据失败", res)
        }
      })
    }else{//false
      try {
        return DB.where({
          id: that.data.id
        }).remove({
          success(res) {
            wx.showToast({
              icon: 'success',
              title: '取消收藏成功',
            })
            console.log('删除数据成功', res)
          }
        })
      } catch(e) {
        console.error(e)
        wx.showToast({
          icon: 'none',
          title: '取消收藏失败',
        })
      }
    }
  }
}

Page(pageOptions)
