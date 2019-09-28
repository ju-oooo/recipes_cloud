// 获取图片链接
const _getImageUrl = (id) => {
  return `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${id}.jpg`;
}
// 云函数请求封装
const _requestCloud = (url, param = {}) => {
  param.$url = url;
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'recipes',
      data: param
    }).then(res => {
      console.log(123, res)
      wx.hideLoading();
      resolve(res)
    }).catch(err => {
      console.log(123, err)
      wx.hideLoading();
      reject(err)
    })
  })
}
export {
  _requestCloud,
  _getImageUrl
}