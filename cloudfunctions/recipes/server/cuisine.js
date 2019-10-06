let cloud, db, wxContext;
const _init = (c, d, w) => {
  cloud = c;
  db = d;
  wxContext = w;
};

// 根据搜索内容 获取菜品列表
const _search = async(context, next) => {
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
}
// 根据id 获取菜品详情
const _getDeatil = async(context, next) => {
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
    console.log(wxContext.OPENID)
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
}

// 根据类型获取热门菜品列表 降序
const _getListByType = async(context, next) => {
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
}

// 根据当前时间 推荐类型
const _getNow = async(context, next) => {
  try {
    let params = context._req.event;
    let type = await db.collection('cuisine_type')
      .where({
        id: params.recommendTypeId
      }).get();
    let recommendList = await db.collection('cuisine')
      .where({
        type_id: params.recommendTypeId
      })
      .orderBy('like_number', 'desc')
      .skip((params.pageNum - 1) * params.count)
      .limit(params.count)
      .get();
    context.body = await {
      type: type.data[0],
      recommendList: recommendList.data
    };
  } catch (e) {
    console.log(e);
    context.body = null
  }
}

// 获取热门菜品 降序
const _getHot = async(context, next) => {
  try {
    let params = context._req.event;
    context.body = await db.collection('cuisine')
      .orderBy('like_number', 'desc')
      .skip((params.pageNum - 1) * params.count)
      .limit(params.count)
      .get()
  } catch (e) {
    console.log(e);
    context.body = null
  }
}

// 获取类型并获取最热菜品图
const _getType = async(context, next) => {
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
      typeList.data[index]['imgId'] = temp.data[0].id
    }
    context.body = await typeList;
  } catch (e) {
    context.body = null
  }
}

module.exports = {
  _init,
  _search,
  _getDeatil,
  _getListByType,
  _getNow,
  _getHot,
  _getType
}