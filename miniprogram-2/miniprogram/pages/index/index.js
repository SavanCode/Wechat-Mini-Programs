//index.js
const app = getApp()
const DB = wx.cloud.database().collection("testlist")
let name='';
let age='';
let id = '';
let nameDelete = ''
let updateID = ''
let updateValue = ''

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  addName(event){
      //console.log(event.detail.value)
      name = event.detail.value
    },

  addAge(event){
    //console.log(event.detail.value)
    age = event.detail.value
  },

  addData() {
    console.log('调用添加数据的方法')
    DB.add({
      data: {
        name: name,
        age: age
      },
      success(res) {
        console.log("添加数据成功", res)
      },
      fail(res) {
        console.log("添加数据失败", res)
      }
    })
  },

  getData() {
    console.log('调用查询数据的方法')
    DB.get({
      success(res){
        console.log('查询数据成功',res)
      }
    })
  },
  delDataInput(event){
    //console.log(event.detail.value)
    id = event.detail.value
  },

  delData() {
    console.log('调用删除数据的方法')
    DB.doc(id).remove({
      success(res) {
        console.log('删除数据成功', res.data)
      }
    })
  },
  delDataInputName(event){
    //console.log(event.detail.value)
    nameDelete = event.detail.value
  },
  
  delDataByProperty() {
    console.log('调用属性删除数据的方法')
    DB.where({
      name: nameDelete
    }).remove({
      success(res) {
        console.log('删除数据成功', res.data)
      },
      fail(res) {
        console.log("删除数据失败", res)
      }
    })
  },
  updateID(event) {
    console.log(event.detail.value)
    updateID = event.detail.value
  },

  updateValue(event) {
    console.log(event.detail.value)
    updateValue = event.detail.value
  },
  
  updateData() {
    console.log('调用修改更新数据的方法')
    DB.doc(updateID).update({
      data: {
        name: updateValue
      },
      success(res) {
        console.log('修改更新数据成功', res.data)
      },
      fail(res) {
        console.log("修改更新数据失败", res)
      }
    })
  },


  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
