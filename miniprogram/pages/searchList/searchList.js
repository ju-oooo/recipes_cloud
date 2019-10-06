// miniprogram/pages/searchList/searchList.js
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const validate = require('../../utils/validate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    historyKW: '',
    pageNum: 1,
    count: 20,
    cuisineList: [],
    listEnd: true
  },
  // 沙拉
  // 搜索字段监听
  _onSearch_kw: function(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  // 搜索
  _search: function() {
    if (this.data.kw == '') {
      util._toast('请输入关键词');
    } else {
      util._loading('加载中...');
      api._requestCloud('cuisine/search', {
        kw: this.data.kw,
        pageNum: this.data.pageNum,
        count: this.data.count
      }).then(res => {
        let data = res.result.data;
        if (data.length > 0) {
          this.setData({
            listEnd: false,
            pageNum: ++this.data.pageNum,
          });
        }
        let cuisineList = this.data.historyKW != this.data.kw ? [] : this.data.cuisineList;
        this.setData({
          cuisineList: cuisineList.concat(data)
        });
        wx.stopPullDownRefresh();
      });
    }
  },
  // 跳转到详情页
  _toCuisineDetail: function(e) {
    let cuisine_id = e.currentTarget.dataset.cuisine_id;
    console.log(cuisine_id)
    wx.navigateTo({
      url: `/pages/cuisineDetail/cuisineDetail?cuisine_id=${cuisine_id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      kw: options.kw,
      historyKW: options.kw
    })
    this._search();
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
    if (this.data.listEnd) {
      util._toast('没有更多数据了');
      return;
    } else {
      this._search();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})