let cloud, db, wxContext;
const _init = (c, d, w) => {
  cloud = c;
  db = d;
  wxContext = w;
};
// 添加进收藏
const _add = async(context, next) => {
  try {
    let params = context._req.event;
    context.body = await db.collection('collect')
      .add({
        data: {
          cuisine_id: params.cuisine_id,
          appid: wxContext.OPENID,
          time: new Date().getTime()
        }
      })
  } catch (e) {
    context.body = null
  }
}
// 查询收藏菜品列表 根据用户id
const _get = async(context, next) => {
  try {
    let params = context._req.event;
    let collectList = await db.collection('collect')
      .where({
        appid: wxContext.OPENID
      })
      .orderBy('time', 'desc')
      .skip((params.pageNum - 1) * params.count)
      .limit(params.count)
      .get();

    for (let index in collectList.data) {
      let temp = await db.collection('cuisine')
        .where({
          _id: collectList.data[index].cuisine_id
        })
        .get();
      collectList.data[index] = await Object.assign(collectList.data[index], temp.data[0]);
    }
    context.body = await {
      collectList: collectList
    }
  } catch (e) {
    console.log(e)
    context.body = null
  }
}
// 删除收藏 根据_id
const _remove = async(context, next) => {
  try {
    let params = context._req.event;
    context.body = await db.collection('collect')
      .where({
        cuisine_id: params.cuisine_id,
        appid: wxContext.OPENID
      })
      .remove()
  } catch (e) {
    context.body = null
  }
}

module.exports = {
  _init,
  _add,
  _get,
  _remove
}