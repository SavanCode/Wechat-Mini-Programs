// pages/uploadImg/uploadImg.js 
// Page({
//   data:{
//     URL:''
//   },

//   handleTap:function() {
//     let that = this
//     console.log("点击了上传按钮")
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success(res) {
//         console.log("选择成功", res)
//         that.upload(res.tempFilePaths[0])
//       }
//     }) 
//   },

//   upload(imgUrl) {
//     wx.cloud.uploadFile({
//       cloudPath: new Date().getTime() +'.png',    //防止文件名重复，使用时间戳
//       filePath: imgUrl, // 文件路径
//       success: res => {
//         // get resource ID
//         console.log("上传成功",res)
//         this.setData({
//           URL: res.fileID
//         })
//       },
//       fail: err => {
//         // handle error
//       }
//     })
//   }
// })
 
Page({
  data: {
    imgURL:''
  },
  selectAndUpload:function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('choose successfully',res)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: res.tempFilePaths[0], // 文件路径
          success: function (res) {
            console.log('upload successfully', res)
            that.setData({
              imgURL: res.fileID
            })
          },
          fail(res) {
            console.log('upload failed', res)
          }
        })
      },
      fail(res) {
        console.log('choose failed', res)
      }
    })
  },
}) 