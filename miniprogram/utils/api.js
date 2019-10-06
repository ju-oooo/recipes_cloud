// 云函数请求封装
const _requestCloud = (url, param = {}) => {
  param.$url = url;
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'recipes',
      data: param
    }).then(res => {
      console.log(123, url, res)
      wx.hideLoading();
      resolve(res)
    }).catch(err => {
      console.log(456, err)
      wx.hideLoading();
      reject(err)
    })
  });
}
export {
  _requestCloud
}