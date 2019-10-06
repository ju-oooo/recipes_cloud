//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'recipes'
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData = {
                userInfo: res.userInfo
              }
            }
          })
        }
      }
    })
    this.globalData = {
      userInfo: null
    }

  }

})
// {
//   "pagePath": "pages/socialCircle/socialCircle",
//     "text": "圈子",
//       "iconPath": "images/qz.png",
//         "selectedIconPath": "images/qz-o.png"
// },