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
  const wxContext = cloud.getWXContext();

  // 根据搜索内容 获取菜品列表
  app.router('search', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('cuisine')
        .where({
          description: db.RegExp({
            regexp: params.kw,
            options: 'i',
          })
        })
        .orderBy('like_number', 'desc')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
        .get();
    } catch (e) {
      ctx.body = null
    }
  });
  // 根据id 获取菜品详情
  app.router('getDeatil', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      let detail = await db.collection('cuisine')
        .where({
          _id: params.cuisine_id
        }).get();
      await db.collection('cuisine')
        .where({
          _id: params.cuisine_id
        }).update({
          data: {
            like_number: ++detail.data[0].like_number
          }
        });
      let star = await db.collection('collect')
        .where({
          cuisine_id: params.cuisine_id,
          appid: wxContext.OPENID
        }).get();

      ctx.body = {
        detail: detail.data[0],
        star: star.data.length > 0 ? true : false
      }
    } catch (e) {
      ctx.body = null
    }
  });

  // 根据类型获取热门菜品列表 降序
  app.router('getListByType', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('cuisine')
        .where({
          type_id: params.typeId
        })
        .orderBy('like_number', 'desc')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
        .get();
    } catch (e) {
      ctx.body = null
    }
  });



  // 根据当前时间 推荐类型
  app.router('getNow', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      let type = await db.collection('cuisine_type')
        .where({
          id: params.recommendTypeId
        })
        .get();
      let cuisineList = await db.collection('cuisine')
        .where({
          type_id: params.recommendTypeId
        })
        .orderBy('like_number', 'desc')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
        .get();
      ctx.body = await {
        type,
        cuisineList
      };
      console.log(ctx.body)

    } catch (e) {
      ctx.body = null
    }
  });

  // 获取热门菜品 降序
  app.router('getHot', async(ctx, next) => {
    try {
      let params = ctx._req.event;
      ctx.body = await db.collection('cuisine')
        .orderBy('like_number', 'desc')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
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
          .orderBy('like_number', 'desc')
          .skip(0)
          .limit(1)
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