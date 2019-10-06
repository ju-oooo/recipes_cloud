// pages/components/cuisineList/index.js
const util = require('../../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cuisineList: {
      type: Array
    }
  },
  observers: {
    'cuisineList' (cuisineList) {
      cuisineList = util._getCuisineList(cuisineList);
      this.setData({
        cuisineLeftList: cuisineList.cuisineLeftList,
        cuisineRightList: cuisineList.cuisineRightList
      });
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    cuisineLeftList: [],
    cuisineRightList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 页面跳转
    _toView(e) {
      let navigatePath = e.currentTarget.dataset.navigate;
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../${navigatePath}/${navigatePath}?id=${id}`
      });
    }
  }
})