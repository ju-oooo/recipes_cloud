// pages/components/choiceList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    choiceList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

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