// pages/index/index.js
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const validate = require('../../utils/validate.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    choiceList: [],
    recommendList: [],
    nowType: {},
    pageNum: 1,
    count: 20,
    kw: ''
  },
  // 输入监听
  _onSearch_kw(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  // 进入搜索页
  _toSearch() {
    if (this.data.kw == '') {
      util._toast('请输入关键词');
    } else {
      util._navigateTo('searchList', {
        kw: this.data.kw
      });
      this.setData({
        kw: ''
      })
    }
  },
  // 获取推荐类型
  getRecommendType() {
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
  _getNowTypeCuisine() {
    let recommendTypeId = this.getRecommendType();
    api._requestCloud('cuisine/getNow', {
      recommendTypeId: recommendTypeId,
      pageNum: 1,
      count: 2
    }).then(res => {
      let data = res.result;
      this.setData({
        recommendList: data.recommendList,
        nowType: data.type
      });
      wx.stopPullDownRefresh();
    });
  },
  //获取热门菜品
  _getHotCuisine() {
    api._requestCloud('cuisine/getHot', {
      pageNum: this.data.pageNum,
      count: this.data.count
    }).then(res => {
      let data = res.result.data;
      let choiceList = this.data.choiceList;
      this.setData({
        pageNum: ++this.data.pageNum,
        choiceList: choiceList.concat(data)
      });
      wx.stopPullDownRefresh();
    });
  },
  // 页面跳转
  _toView(e) {
    let navigatePath = e.currentTarget.dataset.navigate;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../${navigatePath}/${navigatePath}?id=${id}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this._getNowTypeCuisine();
    this._getHotCuisine();
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
    this.setData({
      cuisineList: [],
      recommendList: [],
      nowType: [],
      pageNum: 1,
      count: 20
    })
    this._getNowTypeCuisine();
    this._getHotCuisine();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this._getHotCuisine();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})