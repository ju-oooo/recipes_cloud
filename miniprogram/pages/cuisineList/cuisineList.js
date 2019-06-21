// pages/cuisineTypeList/cuisineTypeList.js

import {
  flow_concat,
  getImage
} from '../../util/util.js'
const app = getApp();
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
  onLoad: function(params) {
    this.setData({
      classify_id: params.classify_id
    });
    this._getCuisineList();
  },
  // 获取列表页数据
  _getCuisineList: function() {
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getListByType',
        typeId: this.data.classify_id,
        pageNum: this.data.pageNum,
        count: this.data.count,
      }
    }).then(res => {
      let data = res.result.data;
      // 修改imageUrl
      data.forEach((elem, index) => {
        data[index].img_url = `${app.imageUrl}${elem.id}.jpg`;
      });

      // 错位打散拼接数组
      let cuisineList = flow_concat(this.data.cuisineList, data);
      // 判断是否到末页
      if (data.length >= this.data.count) {
        this.setData({
          pageNum: ++this.data.pageNum
        })
      } else {
        this.setData({
          listEnd: false
        })
      }
      // 设置数据
      this.setData({
        cuisineList: cuisineList,
      })
      wx.stopPullDownRefresh();
      console.log('列表页数据', data)
    }).catch(err => {
      wx.stopPullDownRefresh();
      console.log('列表页数据', err)
    })
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
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})