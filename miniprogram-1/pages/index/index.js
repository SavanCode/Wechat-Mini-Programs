// index.js
// 获取应用实例
const app = getApp()
let a = 0
let b = 0

Page({
  data: { 
  },
  getSum:function() {
    wx.cloud.callFunction({
      name:"add",
      data:{
        a:5,
        b:6
      },
      success(res){
        console.log("请求成功！", res)
      },
      fail(res){
        console.log("请求失败！",res)
      }
    })
  },
  handleInput1(event) {
    //console.log(event.detail.value)
    a = event.detail.value
  },

  handleInput2(event) {
    //console.log(event.detail.value)
    b = event.detail.value
  },

  getSum1() {
    wx.cloud.callFunction({
      name: "add",
      data: {
        a: a - '',
        b: b - ''
      },
      success(res) {
        console.log("请求成功！", res)
      },
      fail(res) {
        console.log("请求失败！", res)
      }
    })
  }
})
