import config from './config';
const request = (url, data={},method='GET') => { 
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host+url,
      method,
      data, 
      success(res) {
        console.log("success",res)
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
