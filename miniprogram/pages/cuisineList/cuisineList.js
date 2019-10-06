// pages/cuisineTypeList/cuisineTypeList.js
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const validate = require('../../utils/validate.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuisineList: [],
    count: 20,
    pageNum: 1,
    classify_id: 0,
    listEnd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      classify_id: options.id
    }, () => {
      this._getCuisineList();
    });
  },
  // 获取列表页数据
  _getCuisineList(typeId = this.data.classify_id) {
    api._requestCloud('cuisine/getListByType', {
      typeId: typeId,
      pageNum: this.data.pageNum,
      count: this.data.count
    }).then(res => {
      let data = res.result.data;
      if (data.length >= this.data.count) {
        let cuisineList = this.data.cuisineList;
        this.setData({
          cuisineList: cuisineList.concat(data),
          pageNum: ++this.data.pageNum
        })
      } else {
        this.setData({
          listEnd: false
        })
      }
      wx.stopPullDownRefresh();
    });
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
    this.setData({
      'pageNum': 1,
      'cuisineList': []
    })
    this._getCuisineList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.listEnd) {
      this._getCuisineList();
    } else {
      util._toast('没有更多数据了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})