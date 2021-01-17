const pageOptions = {
  // 页面数据
  data: {
    //  username:"",
    //  password:""
    disabled:true,
    btnstate:"default"
  },
  // 页面载入时
  onLoad() { 
    wx.setNavigationBarTitle({
      title: '企业用户注册'
    })
  }, 
  handleUsername:function(e){
    var username = e.detail.value
    console.log(username);
    if (username != '') {
      this.setData({disabled:false,btnstate:'primary'});
    } else {
      this.setData({disabled:true,btnstate:'default'});
    }
  },
  formSubmit:function(e){

    // 包含了所有input的值
    console.log(e.detail.value);

    var user = new Object();

    // 通过input.name获取
    user.account = e.detail.value.loginName;
    user.password = e.detail.value.password;
    user.company = e.detail.value.company;
    user.username = e.detail.value.username;
    user.code = e.detail.value.code;
    user.mobile = e.detail.value.mobile;
    user.switch = e.detail.value.switch;

    // 本地缓存 
    wx.setStorageSync('user', user);

    // 短暂的对话框
    wx.showToast({
      title: '注册成功',
      icon:"success",
      duration:2000,
      success:function(){
        wx.navigateTo({
          url: '../login/login',
        })
      }
    });

  }
  
} 
 

Page(pageOptions)
