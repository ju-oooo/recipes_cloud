const app = getApp();
// 工具集
// 修改图片路径
export function getImage(data) {
  data.forEach((elem, index) => {
    data[index].img_url = `${app.imageUrl}${elem.img_url}.jpg`;
  });
  return data;
}
// 为瀑布流打散数组
function _scatter(data) {
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
}
// 为瀑布流拼接数组
export function flow_concat(oldList, data) {
  data = _scatter(data);
  let length = oldList.length;

  if (length > 0) {
    data.slice(0, data.length / 2).forEach((elem, index) => {
      oldList.splice(length / 2 + index, 0, elem)
    });
    data.slice(data.length / 2).forEach((elem) => {
      oldList.push(elem)
    });
  } else {
    oldList = oldList.concat(data)
  }
  console.log(oldList)
  return oldList;
}