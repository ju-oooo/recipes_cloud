// pages/board/board.js
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
    listEnd: true
  },
  // 加载收藏数据
  _getCuisineList() {
    util._loading("加载中");
    api._requestCloud('collect/get', {
      pageNum: this.data.pageNum,
      count: this.data.count,
      noData: false
    }).then(res => {
      let data = res.result.collectList.data;
      let cuisineList = this.data.cuisineList;
      if (data.length > 0) {
        this.setData({
          cuisineList: cuisineList.concat(data),
          noData: true
        })
      } else {
        this.setData({
          pageNum: ++this.data.pageNum,
          listEnd: false
        });
      }
      wx.stopPullDownRefresh();
    });
  },
  // 跳转到详情页
  _toCuisineDetail(e) {
    let cuisine_id = e.currentTarget.dataset.cuisine_id;
    console.log(cuisine_id)
    wx.navigateTo({
      url: `/pages/cuisineDetail/cuisineDetail?cuisine_id=${cuisine_id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        pageNum: 1,
        listEnd: true,
      });
      this._getCuisineList();
    } else {
      util._toast('请登录');
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    if (app.globalData.userInfo) {
      this.setData({
        pageNum: 1,
        listEnd: true,
        cuisineList: []
      });
      this._getCuisineList();
    } else {
      util._toast('请登录');
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.listEnd) {
      util._toast('没有更多数据了');
      return;
    } else {
      this._getCuisineList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})