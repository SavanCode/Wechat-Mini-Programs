// index.js
// 获取应用实例
const app = getApp()
var names = /^[A-Za-z]+$/; //姓名
var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; //手机号
var emailnums = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/; //email
Page({
  data: { 
    disabled:true,
    btnType:"default",
    username:"",
    password:"",
  },
  formSubmit:function(){ 
    let username=this.data.username;
    let password= this.data.password 
    //check name&pw
    if(!names.test(username)||phonetel.test(username)||emailnums.test(username) ){
      wx.showModal({
        title:'错误提示',
        content:'请输入正常的用户名/手机号/邮箱地址',
        showCancel:false
      }) 
    }else{
      //checking
      wx.showLoading({
        title: '加载中',
      })
      
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }


  },
  accountInput:function(e){ 
    //console.log("username",e.detail.value)
    if (e.detail.value != '') {
      this.setData({disabled:false,btnType:'primary',username:e.detail.value});
    } else {
      this.setData({disabled:true,btnType:'default',username:e.detail.value});
    }
  },
  passwordInput:function(e){
    //console.log("password",e.detail.value)
    if (e.detail.value != '') {
      this.setData({disabled:false,btnType:'primary',password:e.detail.value});
    } else {
      this.setData({disabled:true,btnType:'default',password:e.detail.value});
    }
  }, 
  
})
