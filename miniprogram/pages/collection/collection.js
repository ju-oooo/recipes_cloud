// pages/board/board.js
const app = getApp();
import Toast from '/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuisineList: null
  },
  // 加载收藏数据
  _getCuisineList: function() {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: true,
      message: '加载中...'
    });
    wx.cloud.callFunction({
      name: 'collect',
      data: {
        $url: 'get',
        pageNum: 1,
        count: 20
      }
    }).then(res => {
      let data = res.result.collectList.data;
      data.forEach((elem, index) => {
        data[index].cuisine.img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.cuisine.id}.jpg`;
      });
      this.setData({
        cuisineList: data
      });
      Toast.clear();
      console.log('收藏数据', data)
    }).catch(err => {
      Toast.clear();
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
    this._getCuisineList();
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
    // if (app.globalData.userInfo) {
    //   this._getCuisineList();
    // } else {
    //   wx.showToast({
    //     title: '请登录',
    //     icon: 'none'
    //   })
    // }
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
    this._getCuisineList();
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