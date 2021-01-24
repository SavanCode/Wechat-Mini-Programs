// pages/fav/fav.js
const DB = wx.cloud.database().collection("newteo2_newlist")
const posts_content = [
  {
    date: "Sep 18 2016",
    title: "缘分",
    imgSrc: "../../img/banner1.png",
    avatar: "../../img/user.png",
    content: "其实，同窗或者同事的缘分，都是有时尽的",
    reading: "112",
    collection: "96",
    headImgSrc: "../../img/user.png",
    author: "林白衣",
    dateTime: "24小时前",
    detail: "其实，同窗或者同事的缘分，都是有时尽的，如果你从中把个别人变成了一生挚爱或者挚友，缘分会稍长一点，但我们大部分人都只是萍水相逢短暂共处的缘分。这就是人生。菊黄蟹正肥，品尝秋之味。徐志摩把“看初花的荻芦”和“到楼外楼吃蟹”并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，壳凸红脂块块香”；在《世说新语》里，晋毕卓更是感叹“右手持酒杯，左手持蟹螯，拍浮酒船中，便足了一生矣。”漫漫人生长路，美食与爱岂可辜负？于是作为一个吃货，突然也很想回味一下属于我的味蕾记忆。记忆中的秋蟹，是家人的味道，弥漫着浓浓的亲情。\n\n是谁来自山川湖海，却囿于昼夜，厨房与爱？ 是母亲，深思熟虑，聪明耐心。吃蟹前，总会拿出几件工具，煞有介事而乐此不疲。告诉我们螃蟹至寒，需要佐以姜茶以祛寒，在配备的米醋小碟里，亦添入姜丝与紫苏，前者驱寒后者增香。泡好菊花茶，岁月静好，我们静等。",
    postId: 0,
    music: {
      url: "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38",
      title: "夜夜夜夜-齐秦",
      coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
    }
  },
  {
    title: "比利·林恩的中场故事",
    content: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。",
    imgSrc: "../../img/banner1.png",
    reading: 62,
    detail: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性”李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。预告片首次曝光后，被视作是明年奥斯卡种子选手。该片根据同名畅销书改编。原著小说荣获美国国家图书奖。也被BBC评为21世纪最伟大的12本英文小说之一。影片讲述一位19岁德州男孩的比利·林恩入伍参加伊战，在一次交火中他大难不死，意外与战友成为大众的关注焦点，并被塑造成英雄。之后他们返回国内，在橄榄球赛中场休息时授勋。这名战争英雄却面临前所未有的心灵煎熬……李安为什么选中这部电影来拍？因为李安想要挑战前所未有的技术难题：以120帧每秒的速度、4K、3D技术全面结合，来掀起一场电影视觉革命。什么意思？所谓“电影是24格每秒的谎言”，其中的24格，就是帧数。",
    collection: 92,
    dateTime: "24小时前",
    headImgSrc: "../../img/user.png",
    author: "迷的城",
    date: "Nov 20 2016",
    avatar: "../../img/user.png",
    postId: 1,
    music: {
      url: "http://ws.stream.qqmusic.qq.com/C100003GdCmG4NkEOR.m4a?fromtag=38",
      title: "鬼迷心窍-李宗盛",
      coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000002xOmp62kqSic.jpg?max_age=2592000"
    }
  }]

Page({
  data: {
    collectionList:[],
    recommend:[],
    ending:""
  },
  onLoad: function (options) {
    var that=this;
    wx.setNavigationBarTitle({
      title: '个人收藏'
    })
    DB.get({
      success(res){
        console.log('查询数据成功',res)
        that.setData({
          collectionList:res.data
        })
        //console.log('查询数据成功',that.data.collectionList)
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () { 
    var that = this;
    that.setData({
      collectionList:[], //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
  },
  //tabbar 点击的监听
  onTabItemTap() {
    var that = this;
    that.setData({
      collectionList:[], //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
    },
    onReachBottom: function () {
      var that=this;
       wx.showToast({
         title: '加载中',
         icon: 'loading',
         image: '',
         duration: 1500,
         mask: false,
         success: (result)=>{
          setTimeout(() => {
            that.setData({
              ending:"oops~ 没有更多收藏了 看看新的吧",
              recommend:posts_content
            })
          })
         },
         fail: ()=>{},
         complete: ()=>{}
       }); 
    },
    goDetail:function(e){
      var news = e.currentTarget.dataset.news.content;   
      //console.log(e);
      wx.navigateTo({
        url:"../detail/index?id=" + news.post_id//注意相对位置
        })
    },
    onShow: function() {
      // 当返回当前页面的时候，会自动调用这个参数，则实现自动返回刷新
      this.onLoad()
      this.onReady()
    }
})