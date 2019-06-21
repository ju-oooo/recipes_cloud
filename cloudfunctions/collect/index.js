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
  const wxContext = cloud.getWXContext();
  // 添加进收藏
  app.router('add', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('collect')
        .add({
          data: {
            cuisine_id: params.cuisine_id,
            appid: wxContext.OPENID,
            time: new Date().getTime()
          }
        })
    } catch (e) {
      ctx.body = null
    }
  });
  // 查询收藏菜品列表 根据用户id
  app.router('get', async(ctx, next) => {
    try {
      let params = ctx._req.event;
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
          .get()

        collectList.data[index].cuisine = await temp.data[0];

      }
      ctx.body = await {
        collectList: collectList
      }
    } catch (e) {
      ctx.body = null
    }
  });
  // 删除收藏 根据_id
  app.router('remove', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('collect')
        .where({
          cuisine_id: params.cuisine_id,
          appid: wxContext.OPENID
        })
        .remove()
    } catch (e) {
      ctx.body = null
    }
  });


  return app.serve();
}