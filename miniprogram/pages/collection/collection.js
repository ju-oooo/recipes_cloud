// pages/board/board.js
const app = getApp();

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
  _getCuisineList: function() {
    wx.showLoading({
      mask: true,
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'collect',
      data: {
        $url: 'get',
        pageNum: this.data.pageNum,
        count: this.data.count
      }
    }).then(res => {
      let data = res.result.collectList.data;
      data.forEach((elem, index) => {
        data[index].cuisine.img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.cuisine.id}.jpg`;
      });
      if (data.length < this.data.count) {
        this.setData({
          pageNum: ++this.data.pageNum,
          listEnd: false
        });
      }
      this.setData({
        cuisineList: this.data.cuisineList.concat(data)
      });
      wx.hideLoading();
      console.log('收藏数据', data)
    }).catch(err => {
      wx.hideLoading();
      console.log('收藏数据', err)
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {


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
    if (app.globalData.userInfo) {
      this.setData({
        pageNum: 1,
        listEnd: true,
        cuisineList: []
      });
      this._getCuisineList();
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }

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
      pageNum: 1,
      listEnd: true,
      cuisineList: []
    });
    this._getCuisineList();
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
      this._getCuisineList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})