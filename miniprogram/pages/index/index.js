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
    cuisineList: [],
    nowCuisineList: [],
    nowType: [],
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
    util._navigateTo('searchList', {
      kw: this.data.kw
    });
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
      let nowCuisineList = data.cuisineList.data;
      nowCuisineList.forEach((elem, index) => {
        nowCuisineList[index].img_url = api._getImageUrl(elem.id);
      });
      this.setData({
        nowCuisineList: nowCuisineList,
        nowType: data.type.data[0]
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
      data.forEach((elem, index) => {
        data[index].img_url = api._getImageUrl(elem.id);
      });
      this.setData({
        pageNum: ++this.data.pageNum,
        cuisineList: this.data.cuisineList.concat(data)
      });
      wx.stopPullDownRefresh();
    });
  },
  // 跳转到详情页
  _toCuisineDetail(e) {
    let cuisine_id = e.currentTarget.dataset.cuisine_id;
    util._navigateTo('cuisineDetail', {
      cuisine_id: cuisine_id
    });
  },
  // 点击查看更多
  _toCuisineList() {
    let classify_id = this.data.nowType.id;
    util._navigateTo('cuisineList', {
      classify_id: classify_id
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
      nowCuisineList: [],
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