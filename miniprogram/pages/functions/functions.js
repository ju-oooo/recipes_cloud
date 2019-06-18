// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      console.log(11, res)
    }).catch(err => {
      console.log(22, err)
    })
  },
  // 根据类型获取热门菜品
  _getHotTypeCuisine: function() {
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getType',
        pageNum: 1,
        count: 20
      }
    }).then(res => {
      console.log(11, res)
    }).catch(err => {
      console.log(22, err)
    })
  },
  // 获取首页数据
  getIndexCuisine: function() {
    this._getHotCuisine();
  },
  // 获取类型最新数据
  getHotTypeCuisine: function() {
    this._getHotTypeCuisine();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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