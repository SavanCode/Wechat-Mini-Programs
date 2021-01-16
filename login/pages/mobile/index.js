var phonetel = /^[1][3,4,5,7,8][0-9]{9}$/; //手机号
const pageOptions = {
  // 页面数据
  data: { 
    checked:false,
    disabled:true,
    tele:""
  },
  // 页面载入时
  onLoad(e) { 
    wx.setNavigationBarTitle({
      title: '手机快速注册'
    })
  },
  checkedTap:function(){
    this.setData({
      checked: !this.data.checked
    })
  }, 
  mobileInput:function(e){
    this.setData({
      tele:e.detail.value,
      disabled:false
    }) 
  },
  formSubmit:function(){
    if(!phonetel.test(this.data.tele)){
      wx.showModal({
            title: '请注意',
            content: '请重新输入正确的电话号码',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    }else if(!this.data.checked){
      wx.showModal({
        title: '请注意',
        content: '请同意京东用户注册协议',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showLoading({
        title: '加载中',
      })
      
      setTimeout(function(){
        wx.hideLoading()
      },2000)
      }
  }
}

Page(pageOptions)
