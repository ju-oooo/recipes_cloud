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
      ctx.body = await db.collection('cuisine')
        .add({

        })
    } catch (e) {
      ctx.body = null
    }
  });
  // 查询收藏菜品列表 根据用户id
  app.router('get', async(ctx, next) => {
    try {
      ctx.body = await db.collection('cuisine')
        .skip(0)
        .limit(10)
        .orderBy('like_number', 'desc')
        .get()
    } catch (e) {
      ctx.body = null
    }
  });
  // 删除收藏 根据_id
  app.router('get', async(ctx, next) => {
    try {
      ctx.body = await db.collection('cuisine')
        .skip(0)
        .limit(10)
        .orderBy('like_number', 'desc')
        .get()
    } catch (e) {
      ctx.body = null
    }
  });


  return app.serve();
}