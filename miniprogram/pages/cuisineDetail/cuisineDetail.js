// pages/details/details.js

const app = getApp();
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
  _getCuisineDetails: function(cuisine_id, userId) {
     wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getDeatil',
        cuisine_id
      }
    }).then(res => {
      console.log(res)
      let details = res.result.detail;
      details.img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${details.id}.jpg`;
      details.food_material = details.food_material.split("#");
      details.cooking_step = details.cooking_step.split("#");
      this.setData({
        details: details
      })
      // 检测是否存在于我的收藏
      if (res.result.star) {
        this.setData({
          'star': res.result.star,
        })
      }
      wx.stopPullDownRefresh();
      console.log('详情页数据', details)
    }).catch(err => {
      wx.stopPullDownRefresh();
      console.log('详情页数据', err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(params) {
    this.setData({
      cuisine_id: params.cuisine_id
    });
    if (!app.globalData.userInfo) {
      this._getCuisineDetails(this.data.cuisine_id, null);
    } else {
      this._getCuisineDetails(this.data.cuisine_id, app.globalData.userInfo.id);
    }
  },

  // 改变收藏
  _changeCollect: function() {
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      });
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

    // wx.showLoading({
    //   mask: true,
    //   title: '加载中...'
    // })
    wx.cloud.callFunction({
      name: 'collect',
      data: {
        $url: url,
        cuisine_id: this.data.details._id
      }
    }).then(res => {
      this.setData({
        'star': !this.data.star,
      })
      // wx.hideLoading();
      wx.showToast({
        title: message+'成功',
        icon:"none"
      })
      console.log(res)
    }).catch(err => {
      // wx.hideLoading();
      console.log(err)
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
    if (!app.globalData.userInfo) {
      this._getCuisineDetails(this.data.cuisine_id, null);
    } else {
      this._getCuisineDetails(this.data.cuisine_id, app.globalData.userInfo.id);
    }
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