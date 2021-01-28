// miniprogram/pages/search/search.js  
import {debounce} from '../../utils/inputTimer'
import {request} from '../../utils/util'
Page({
  data: {
    placeholderContent:"",
    hotList:[],
    searchContent:'',
    searchResultList:[],
    searchHistory:[]
  },
  onLoad: function (options) {
    this.getDefaultData();
    this.getSearchHistory();
  },getSearchHistory:function(){
    let searchHistory=[]
    try {
      var value = wx.getStorageSync('searchHistory')
      if (value) {
        this.setData({
          searchHistory:value
        }) 
      }
      } catch (e) {
         this.setData({
           searchHistory
         })
      }
  },
   getDefaultData: async function(){
    let placeholderData = await request('/search/default');
    let hotListData = await request('/search/hot/detail');
    this.setData({
      placeholderContent: placeholderData.data.showKeyword,
      hotList: hotListData.data
    })
  },
  doSearch: function(e){
    //console.log(e.detail.value)
    this.setData({
      searchContent: e.detail.value.trim()
    }) 
   debounce(this.getSearchResult(), 1500, true)
  },
  getSearchResult: async function(){
    ///search?keywords=海阔天空&limit=10
   let {searchContent} = this.data; 
    let searchResult = await request('/search', {keywords: searchContent, limit: 10});
    this.setData({
      searchResultList: searchResult.result.songs
    })
    //console.log(searchResult)
    wx.setStorageSync('searchHistory', [...this.data.searchHistory,searchContent])
  },
  clearSearch:function(){
    this.setData({
      searchContent:"",
      searchResultList:[]
    })
    wx.setStorageSync('searchHistory', [])
  },
  cancelSearch:function(){
   wx.switchTab({
     url: '../video/video',
   })
  },
  clearSearchHistory:function(){
    let that=this;
    wx.showModal({
      title:"确定删除所有的历史记录？",
      confirmText:"是的",
      cancelText:"取消",
      cancelColor: 'cancelColor',
      success (res) {
        if (res.confirm) {
          that.setData({
              searchHistory:[]
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
      
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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