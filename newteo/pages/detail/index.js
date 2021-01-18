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
    })
    var that=this;
    that.setData({
      id: e.id
    });
    // console.log(e.id);
    this.getContent(e.id)
  },
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
  liked:function(){
    var that=this;
    let storageList = wx.getStorageSync('collectionList')    
    that.setData({
      collected:!that.data.collected
    })
    if(that.data.collected){//true
      //adding
      wx.showToast({
        title: '收藏成功',
      })
      var updateList=[...storageList,that.data.content];
      console.log(updateList.length);
      wx.setStorageSync("collectionList", updateList)
    }else{//false
      wx.showToast({
        title: '取消收藏',
      })
      var updateList=storageList.filter(item=>item.post_id!=that.data.id)
      console.log(updateList.length);
      wx.setStorageSync("collectionList", updateList) 
    }
  }
}

Page(pageOptions)
