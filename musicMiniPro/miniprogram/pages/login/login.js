// miniprogram/pages/login/login.js
import { request } from "../../utils/util";
/*
  1. 收集表单项数据
  2. 前端验证
    1) 验证用户信息(账号，密码)是否合法
    2) 前端验证不通过就提示用户，不需要发请求给后端
    3) 前端验证通过了，发请求(携带账号, 密码)给服务器端
  3. 后端验证
    1) 验证用户是否存在
    2) 用户不存在直接返回，告诉前端用户不存在
    3) 用户存在需要验证密码是否正确
    4) 密码不正确返回给前端提示密码不正确
    5) 密码正确返回给前端数据，提示用户登录成功(会携带用户的相关信息)
*/
Page({
  data: {
    phone: '',
    password: ''
  },

  onLoad: function (options) { 
  }, 
  handleInput:function(event){
     //let type = event.currentTarget.id;// id传值 取值： phone || password
    //console.log(event.currentTarget);
    let type = event.currentTarget.dataset.type; // data-key=value
    this.setData({
      [type]: event.detail.value
    })
    console.log(this.data);
  },
  // 前端验证
  login: async function(){
    let {phone, password} = this.data;
    //基本验证
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      }) 
    } 

    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })  
    }
    
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      }) 
    }
    //后端验证
    let result= await request('/login/cellphone',{phone,password,isLogin:true});//同名属性可以不写{phone:phone,passwprd:password}
    console.log(result)

    //这里登录cookies在requestcookies过滤了 在utils那里过滤
    if(result.code === 200){ 
      wx.showToast({
        title: '登录成功'
      })
      
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      //因为跳转回去tabbar页面 所以只能用switchtabbar 或者relaunch 
      wx.reLaunch({
        url: '/pages/user/user'
      })
    }else if(result.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }

  },
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
 