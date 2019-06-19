// pages/opinion/opinion.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place_content: '', //内容输入框
    contact_content: '' //联系方式输入
  },
  // 添加建议
  _addFeedback: function() {
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      });
      return;
    } else if (this.data.place_content.length < 1 && this.data.contact_content.length < 1) {
      wx.showToast({
        title: '请多多指教...',
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '加载中...'
      })
      wx.cloud.callFunction({
        name: 'feedback',
        data: {
          $url: 'add',
          context: this.data.place_content,
          contact: this.data.contact_content
        }
      }).then(res => {
        wx.hideLoading();
        this.setData({
          place_content: '',
          contact_content: ''
        });
        wx.showToast({
          title: '感谢您的反馈。',
          icon: 'none'
        })
        console.log(res)
      }).catch(err => {
        wx.hideLoading();
        console.log(err)
      })
    }


  },
  //获取内容输入框中值
  onPlace: function(e) {
    this.setData({
      place_content: e.detail.value
    })
  },
  //获取练习方式输入框中值
  onContact: function(e) {
    this.setData({
      contact_content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})