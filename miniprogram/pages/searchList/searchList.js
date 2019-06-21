// miniprogram/pages/searchList/searchList.js
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
    kw: '',
    historyKW: '',
    pageNum: 1,
    count: 20,
    cuisineList: [],
    listEnd: true
  },
  // 搜索字段监听
  _onSearch_kw: function(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  // 搜索
  _search: function() {
    // 关键词相同时退出
    if (this.data.historyKW == this.data.kw) {
      wx.showToast({
        title: '请不要重复输入',
        icon: 'none'
      });
      return;
    }
    // 关键词为空时退出
    if (this.data.kw == '') {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      });
      return;
    } else {
      wx.showLoading({
        mask: true,
        title: '加载中...'
      })

      wx.cloud.callFunction({
        name: 'cuisine',
        data: {
          $url: 'search',
          kw: this.data.kw,
          pageNum: this.data.pageNum,
          count: this.data.count
        }
      }).then(res => {
        let data = res.result.data;
        // 修改图片路径
        data.forEach((elem, index) => {
          data[index].img_url = `${app.imageUrl}${elem.id}.jpg`;
        });
        // 判断是否到末页
        if (data.length >= this.data.count) {
          this.setData({
            listEnd: false,
            pageNum: ++this.data.pageNum,
          });
        }
        // 错位打散拼接数组
        let cuisineList = flow_concat(this.data.cuisineList, data);

        // 设置数据
        this.setData({
          cuisineList: cuisineList,
          historyKW: this.data.kw
        });
        wx.hideLoading();
        console.log('搜索页数据', data)
      }).catch(err => {
        wx.hideLoading();
        console.log('搜索页数据', err)
      })
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
      kw: options.kw
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
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      });
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