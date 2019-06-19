// pages/index/index.js
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
  _onSearch_kw: function(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  // 进入搜索页
  _toSearch: function() {
    wx.navigateTo({
      url: `/pages/searchList/searchList?kw=${this.data.kw}`
    })
  },
  // 获取推荐类型
  getRecommendType: function() {
    let now = new Date().getHours();
    if (now < 10) {
      return '10007' //早
    } else if (10 < now && now < 16) {
      return '10008' //中
    } else {
      return '10009' //晚
    }
  },
  // 获取当前时间 推荐类型
  _getNowTypeCuisine: function() {
    wx.showLoading({
      mask: true,
      title: '加载中...'
    })

    let recommendTypeId = this.getRecommendType();
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getNow',
        recommendTypeId: recommendTypeId,
        pageNum: 1,
        count: 2
      }
    }).then(res => {
      let data = res.result;
      let nowCuisineList = data.cuisineList.data;
      nowCuisineList.forEach((elem, index) => {
        nowCuisineList[index].img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.id}.jpg`;
      });
      this.setData({
        nowCuisineList: nowCuisineList,
        nowType: data.type.data[0]
      });
     wx.hideLoading();
      console.log('首页推荐类型', data)
    }).catch(err => {
     wx.hideLoading();
      console.log('首页推荐类型', err)
    })
  },
  //获取热门菜品
  _getHotCuisine: function() {
    wx.showLoading({
      mask: true,
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getHot',
        pageNum: this.data.pageNum,
        count: this.data.count
      }
    }).then(res => {
      let data = res.result.data;
      data.forEach((elem, index) => {
        data[index].img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.id}.jpg`;
      });
      this.setData({
        pageNum: ++this.data.pageNum,
        cuisineList: this.data.cuisineList.concat(data)
      });
     wx.hideLoading();
      console.log('首页热门数据', data)
    }).catch(err => {
     wx.hideLoading();
      console.log('首页热门数据', err)
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
  // 点击查看更多
  _toCuisineList: function() {
    let classify_id = this.data.nowType.id;
    wx.navigateTo({
      url: `/pages/cuisineList/cuisineList?classify_id=${classify_id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getNowTypeCuisine();
    this._getHotCuisine();
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
      cuisineList: null,
      nowCuisineList: null,
      nowType: null,
      pageNum: 1,
      count: 20
    })
    this._getNowTypeCuisine();
    this._getHotCuisine();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._getHotCuisine();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})