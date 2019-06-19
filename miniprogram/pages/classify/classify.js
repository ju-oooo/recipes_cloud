// pages/classify/classify.js
import Toast from '/vant-weapp/toast/toast';
Page({
  data: {
    classifyList: null
  },
  // 根据类型获取热门菜品
  _getHotTypeCuisine: function() {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: true,
      message: '加载中...'
    });
    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getType'
      }
    }).then(res => {
      let data = res.result.data;
      data.forEach((elem, index) => {
        data[index].img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.img_url}.jpg`;
      });
      this.setData({
        classifyList: data
      });
      Toast.clear();
      console.log('类型数据', data)
    }).catch(err => {
      Toast.clear();
      console.log('类型数据', err)
    })
  },
  // 跳转到列表页
  _toCuisineList: function(e) {
    let classify_id = e.currentTarget.dataset.classify_id;
    console.log("分类页跳转到列表页", classify_id)
    wx.navigateTo({
      url: `/pages/cuisineList/cuisineList?classify_id=${classify_id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getHotTypeCuisine();
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
    this._getHotTypeCuisine();
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