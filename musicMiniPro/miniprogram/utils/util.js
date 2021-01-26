import config from './config';
const request = (url, data={},method='GET') => { 
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host+url,
      method,
      data, 
      header:{
        cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1):''
        //cookie:wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U')!==-1)
      },
      success(res) {
        //确定是从登陆那边过来的 然后存储本地
        console.log("success",res)
        if(data.isLogin)(
          wx.setStorage({
            data: data,
            key:'cookies',data:res.cookies
          }) 
        )
        resolve(res.data) 
      },
      fail(err) {
        console.log("fail",err)
        reject(err)
      }
    })
  });
} 


module.exports = {
  request
}
