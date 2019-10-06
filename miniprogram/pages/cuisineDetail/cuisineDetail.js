// pages/details/details.js
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const validate = require('../../utils/validate.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    details: null,
    star: false,
    cuisine_id: 0
  },
  // 获取详情页数据
  _getCuisineDetails: function(cuisine_id = this.data.cuisine_id) {
    api._requestCloud('cuisine/getDeatil', {
      cuisine_id: cuisine_id
    }).then(res => {
      let details = res.result.detail;
      details.food_material = details.food_material.split("#");
      details.cooking_step = details.cooking_step.split("#");
      this.setData({
        details: details
      })
      // 检测是否存在于我的收藏
      if (res.result.star && app.globalData.userInfo) {
        this.setData({
          'star': res.result.star,
        })
      }
      wx.stopPullDownRefresh();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(params) {
    this.setData({
      cuisine_id: params.id
    }, () => {
      this._getCuisineDetails();
    });

  },

  // 改变收藏
  _changeCollect: function() {
    if (!app.globalData.userInfo) {
      util._toast('请登录');
      return;
    }
    let url, message;
    if (!this.data.star) {
      url = 'add';
      message = "收藏"
    } else {
      url = 'remove';
      message = "取消"
    }
    api._requestCloud(`collect/${url}`, {
      cuisine_id: this.data.details._id
    }).then(res => {
      this.setData({
        'star': !this.data.star,
      });
      util._toast(`${message}成功`);
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
    this._getCuisineDetails();
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