// pages/welcome/welcome.js
const app = getApp();
Page({
  _into: function() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    welcomeUrl: '../../images/welcome.jpg',
    counter: 3
  },
  // 获取推荐类型
  getRecommendType: function() {
    let now = new Date().getHours();
    if (now < 10) {
      return '10007' //早
    } else if (now < 16) {
      return '10008' //中
    } else {
      return '10009' //晚
    }
  },
  // 获取当前时间 推荐类型
  _getNowTypeCuisine: function() {
    let recommendTypeId = this.getRecommendType();
    console.log(recommendTypeId)
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getNow',
        recommendTypeId: recommendTypeId,
        pageNum: 1,
        count: 2
      }
    }).then(res => {
      let data = res.result;
      let nowCuisineList = data.cuisineList.data;
      nowCuisineList.forEach((elem, index) => {
        nowCuisineList[index].img_url = `${app.imageUrl}${elem.id}.jpg`;
      });

      app.indexData.nowCuisineList = nowCuisineList
      app.indexData.nowType = data.type.data[0]

      wx.stopPullDownRefresh();
      console.log('首页推荐类型', data)
    }).catch(err => {
      wx.stopPullDownRefresh();
      console.log('首页推荐类型', err)
    })
  },
  //获取热门菜品
  _getHotCuisine: function() {

    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getHot',
        pageNum: 1,
        count: 20
      }
    }).then(res => {
      let data = res.result.data;

      data.forEach((elem, index) => {
        data[index].img_url = `${app.imageUrl}${elem.id}.jpg`;
      });
      app.indexData.pageNum = 2;
      app.indexData.cuisineList = data;

      wx.stopPullDownRefresh();
      console.log('首页热门数据', data)
    }).catch(err => {
      wx.stopPullDownRefresh();
      console.log('首页热门数据', err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getNowTypeCuisine();
    this._getHotCuisine();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    setInterval(() => {
      this.setData({
        counter: this.data.counter - 1
      });
      if (!this.data.counter) {
        this._into();
      }
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})