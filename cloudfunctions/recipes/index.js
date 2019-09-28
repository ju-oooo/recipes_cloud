// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router');

cloud.init({
  env: 'recipes'
})

const db = cloud.database();

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext();
  const app = new TcbRouter({
    event
  });

  // 添加进收藏
  app.router('collect/add', async(context, next) => {
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
  });
  // 查询收藏菜品列表 根据用户id
  app.router('collect/get', async(context, next) => {
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
        collectList.data[index].cuisine = await temp.data[0];

      }
      context.body = await {
        collectList: collectList
      }
    } catch (e) {
      context.body = null
    }
  });
  // 删除收藏 根据_id
  app.router('collect/remove', async(context, next) => {
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
  });
  // 根据搜索内容 获取菜品列表
  app.router('cuisine/search', async(context, next) => {
    try {
      let params = context._req.event;
      context.body = await db.collection('cuisine')
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
      context.body = null
    }
  });
  // 根据id 获取菜品详情
  app.router('cuisine/getDeatil', async(context, next) => {
    try {
      let params = context._req.event;
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

      context.body = {
        detail: detail.data[0],
        star: star.data.length > 0 ? true : false
      }
    } catch (e) {
      context.body = null
    }
  });

  // 根据类型获取热门菜品列表 降序
  app.router('cuisine/getListByType', async(context, next) => {
    try {
      let params = context._req.event;
      context.body = await db.collection('cuisine')
        .where({
          type_id: params.typeId
        })
        .orderBy('like_number', 'desc')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
        .get();
    } catch (e) {
      context.body = null
    }
  });

  // 根据当前时间 推荐类型
  app.router('cuisine/getNow', async(context, next) => {
    try {
      let params = context._req.event;
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
      context.body = await {
        type,
        cuisineList
      };
    } catch (e) {
      context.body = null
    }
  });

  // 获取热门菜品 降序
  app.router('cuisine/getHot', async(context, next) => {
    try {
      let params = context._req.event;
      context.body = await db.collection('cuisine')
        .orderBy('like_number', 'desc')
        .skip((params.pageNum - 1) * params.count)
        .limit(params.count)
        .get()
    } catch (e) {
      context.body = null
    }
  });

  // 获取类型并获取最热菜品图
  app.router('cuisine/getType', async(context, next) => {
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
      context.body = await typeList;
    } catch (e) {
      context.body = null
    }
  });

  // 添加建议
  app.router('feedback/add', async(context, next) => {
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
  });
  return app.serve();
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}