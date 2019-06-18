// 云函数入口文件 收藏接口
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
  // 添加进收藏
  app.router('getHot', async(ctx, next) => {
    try {
      ctx.body = await db.collection('collect')
        .add({
          data: ctx._req.event.data
        })
    } catch (e) {
      ctx.body = null
    }
  });
  // 查询收藏菜品列表 根据用户id
  app.router('get', async(ctx, next) => {
    try {
      ctx.body = await db.collection('collect')
        .where({
          user_id: ctx._req.event.user_id
        })
        .orderBy('time', 'desc')
        .get()
    } catch (e) {
      ctx.body = null
    }
  });
  // 删除收藏 根据_id
  app.router('get', async(ctx, next) => {
    try {
      ctx.body = await db.collection('collect')
        .doc(ctx._req.event.id)
        .remove()
    } catch (e) {
      ctx.body = null
    }
  });


  return app.serve();
}