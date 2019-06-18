// pages/opinion/opinion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place_content: '',    //内容输入框
    contact_content: ''   //练习方式输入框
  },
  //获取内容输入框中值
  onPlace:function(e){
    this.setData({
      place_content: e.detail.value
    })
  },
  //获取练习方式输入框中值
  onContact:function(e){
    this.setData({
      contact_content: e.detail.value
    })
  },
  //提交函数（含参数）
  opinion_hand:function(){},
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