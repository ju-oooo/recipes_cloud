// pages/classify/classify.js
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const validate = require('../../utils/validate.js');
Page({
  data: {
    classifyList: null
  },
  // 根据类型获取热门菜品
  _getHotTypeCuisine: function() {
    api._requestCloud('cuisine/getType').then(res => {
      let data = res.result.data;
      this.setData({
        classifyList: data
      });
      wx.stopPullDownRefresh();
    });
  },
  // 跳转到列表页
  _toCuisineList: function(e) {
    let classify_id = e.currentTarget.dataset.classify_id;
    console.log("分类页跳转到列表页", classify_id)
    wx.navigateTo({
      url: `/pages/cuisineList/cuisineList?classify_id=${classify_id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getHotTypeCuisine();
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
    this._getHotTypeCuisine();
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