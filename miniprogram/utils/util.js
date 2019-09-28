// _navigateTo 简单封装
const _navigateTo = (pageName, params) => {
  let queryString = "";
  for (let i in params) {
    queryString += `${i}=${params[i]}&`;
  }
  queryString = queryString.slice(0, -1);
  wx.navigateTo({
    url: `/pages/${pageName}/${pageName}?${queryString}`
  });
}
// 提示
const _toast = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1000
  })
}
// 加载
const _loading = (msg) => {
  wx.showLoading({
    title: msg,
    mask: true
  })
}

export {
  _toast,
  _loading,
  _navigateTo
}