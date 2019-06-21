// pages/cuisineTypeList/cuisineTypeList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cuisineList: [],
    count: 20,
    pageNum: 1,
    classify_id: 0,
    listEnd: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(params) {
    this.setData({
      classify_id: params.classify_id
    });
    this._getCuisineList();
  },
  // 获取列表页数据
  _getCuisineList: function() {
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
      let length = cuisineList.length;
      if (length > 0) {
        data.slice(0, data.length / 2).forEach((elem, index) => {
          cuisineList.splice(length / 2 + index, 0, elem)
        });
        data.slice(data.length / 2).forEach((elem) => {
          cuisineList.push(elem)
        });
      } else {
        cuisineList = cuisineList.concat(data)
      }
      if (data.length >= this.data.count) {
        this.setData({
          pageNum: ++this.data.pageNum
        })
      } else {
        this.setData({
          listEnd: false
        })
      }
      this.setData({
        cuisineList: cuisineList,
      })
      wx.stopPullDownRefresh();
      console.log('列表页数据', data)
    }).catch(err => {
      wx.stopPullDownRefresh();
      console.log('列表页数据', err)
    })
  },
  // 为瀑布流打散数组
  _scatter: function(data) {
    let evenArr = [];
    let oddArr = [];
    let temp;
    for (let index in data) {
      temp = data[index];
      if (index % 2 == 0) {
        evenArr.push(temp)
      } else {
        oddArr.push(temp)
      }
    }
    return evenArr.concat(oddArr);
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
      'cuisineList': []
    })
    this._getCuisineList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.listEnd) {
      this._getCuisineList();
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})