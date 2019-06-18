// 云函数入口文件 菜品接口
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
  // 获取热门菜品 升序
  app.router('getHot', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('cuisine')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
        .orderBy('like_number', 'desc')
        .get()
    } catch (e) {
      ctx.body = null
    }
  });
  // 获取类型并获取最热菜品图
  app.router('getType', async(ctx, next) => {
    try {
      let images = [];
      let typeList = await db.collection('cuisine_type').get();
      for (let index in typeList.data) {
        let temp = await db.collection('cuisine')
          .where({
            type_id: typeList.data[index].id
          })
          .skip(0)
          .limit(1)
          .orderBy('like_number', 'desc')
          .get()
        typeList.data[index]['img_url'] = temp.data[0].id
      }
      ctx.body = await typeList;
    } catch (e) {
      ctx.body = null
    }
  });
  return app.serve();
}