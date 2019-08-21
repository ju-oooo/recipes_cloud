// 获取图片链接
const _getImageUrl = (id) => {
  return `cloud://recipes.7265-recipes-1258010274/image/cuisine/image-${id}.jpg`;
}
// 获取图片链接
const _navigateTo = (pageName,params) => {
  let queryString;
  for(let i in params){
    queryString += `${i} = ${params[i]}&`;
  }
  wx.navigateTo({
    url: `/pages/${pageName}/${pageName}?${queryString}`
  });
}
export {
  _getImageUrl,
  _navigateTo
}