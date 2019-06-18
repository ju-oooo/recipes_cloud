// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuisineList: {},
    nowCuisineList: {}
  },
 
  // 获取当前时间 推荐类型
  _getNowTypeCuisine: function() {
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getNow',
        pageNum: 1,
        count: 20
      }
    }).then(res => {
      console.log('首页推荐类型', res)
      let data = res.result.data;
      data.forEach((elem, index) => {
        data[index].img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.id}.jpg`;
      });
      this.setData({
        cuisineList: data
      });
      console.log('首页推荐类型', data)
    }).catch(err => {
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
        data[index].img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.id}.jpg`;
      });
      this.setData({
        cuisineList: data
      });
      console.log('首页热门数据', data)
    }).catch(err => {
      console.log('首页热门数据', err)
    })
  },
  // 跳转到列表页
  _toCuisineDetail: function(e) {
    let cuisine_id = e.currentTarget.dataset.cuisine_id;
    wx.navigateTo({
      url: '/pages/cuisineDetail/cuisineDetail',
      data: {
        cuisine_id: cuisine_id
      }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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