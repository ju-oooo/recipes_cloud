// miniprogram/pages/searchList/searchList.js
import Toast from '/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: '',
    historyKW: '',
    pageNum: 1,
    count: 20,
    cuisineList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      kw: options.kw
    })
    this._search();

  },
  _search: function() {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: true,
      message: '加载中...'
    });
    if (kw == '') {
      this.setData({
        kw: '*'
      })
    }
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'search',
        kw: this.data.kw,
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
        cuisineList: data
      });
      Toast.clear();
      console.log('搜索页数据', data)
    }).catch(err => {
      Toast.clear();
      console.log('搜索页数据', err)
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