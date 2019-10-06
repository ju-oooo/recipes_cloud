let cloud, db, wxContext;
const _init = (c, d, w) => {
  cloud = c;
  db = d;
  wxContext = w;
};
// 添加建议
const _add = async(context, next) => {
  try {
    let params = context._req.event;
    context.body = await db.collection('recipes_feedback').add({
      data: {
        appid: wxContext.OPENID,
        time: new Date().getTime(),
        contact: params.contact,
        context: params.context
      }
    })
  } catch (e) {
    context.body = null
  }
}
module.exports = {
  _init,
  _add
}