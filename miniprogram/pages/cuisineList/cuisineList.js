// pages/cuisineTypeList/cuisineTypeList.js
import Toast from '/vant-weapp/toast/toast';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuisineList: [],
    count: 20,
    pageNum: 1,
    classify_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(params) {
    console.log("列表页面", params)
    this.setData({
      classify_id: params.classify_id
    });
    this._getCuisineList();
  },
  // 获取列表页数据
  _getCuisineList: function() {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      mask: true,
      message: '加载中...'
    });

    wx.cloud.callFunction({
      name: 'cuisine',
      data: {
        $url: 'getListByType',
        typeId: this.data.classify_id,
        pageNum: this.data.pageNum,
        count: this.data.count,
      }
    }).then(res => {
      let data = res.result.data;
      data.forEach((elem, index) => {
        data[index].img_url = `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${elem.id}.jpg`;
      });
      let cuisineList = this.data.cuisineList;
      let newCuisineList = [].concat(cuisineList);
      let length = cuisineList.length;
      if (length > 0) {
        data.slice(0, this.data.count / 2).forEach((elem, index) => {
          cuisineList.splice(length / 2 + index, 0, elem)
        });
        data.slice(this.data.count / 2).forEach((elem) => {
          cuisineList.push(elem)
        });
      } else {
        newCuisineList = newCuisineList.concat(data)
      }

      this.setData({
        cuisineList: newCuisineList,
        pageNum: ++this.data.pageNum
      })
      Toast.clear();
      console.log('列表页数据', data)
    }).catch(err => {
      Toast.clear();
      console.log('列表页数据', err)
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
      'pageNum': 1,
      'recipesList': []
    })
    this._getCuisineList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._getCuisineList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})