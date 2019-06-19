// 云函数入口文件 用户反馈
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

cloud.init({
  env: 'recipes'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const app = new TcbRouter({
    event
  });
  const wxContext = cloud.getWXContext();
  // 添加进收藏
  app.router('add', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('recipes_feedback')
        .add({
          data: {
            appid: wxContext.OPENID,
            time: new Date().getTime(),
            contact: params.contact,
            context: params.context
          }
        })
    } catch (e) {
      ctx.body = null
    }
  });
  return app.serve();
}