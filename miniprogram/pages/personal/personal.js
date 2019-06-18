// pages/personal/personal.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    url: app.globalData.URL
  },
  // 更多功能敬请期待
  _more: function () {
    wx.showToast({
      title: '敬请期待',
      icon: "none"
    })
  }, // 注销
  _logout: function () {
    let _this = this;
    wx.showModal({
      title: '温馨提示',
      content: '确认要注销么？',
      success: function (res) {
        if (res.confirm) {
          app.globalData.userInfo = null;
          _this.setData({
            userInfo: null
          })
        }
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      // http://localhost:5159/image/user/jf-user-0.jpg
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})