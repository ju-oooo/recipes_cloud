// pages/opinion/opinion.js
const app = getApp();
const api = require('../../utils/api.js');
const util = require('../../utils/util.js');
const validate = require('../../utils/validate.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '', //内容输入框
    contact: '' //联系方式输入
  },
  _validateFeedback() {

  },
  // 添加建议
  _addFeedback() {
    if (!app.globalData.userInfo) {
      util._toast('请登录');
      return;
    } else if (this.data.context.length < 1 && this.data.contact.length < 1) {
      util._toast('请多多指教...');
    } else {
      util._loading('加载中...');
      api._requestCloud('feedback/add', {
        context: this.data.context,
        contact: this.data.contact
      }).then(res => {
        this.setData({
          context: '',
          contact: ''
        });
        util._toast('感谢您的反馈');
      });
    }

  },
  //获取内容输入框中值
  _setParams(e) {
    let params = e.currentTarget.dataset.params
    this.setData({
      [params]: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})