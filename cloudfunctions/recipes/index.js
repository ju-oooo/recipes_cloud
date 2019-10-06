// 云函数入口文件
const cloud = require('wx-server-sdk');
const tcbRouter = require('tcb-router');
const collect = require('./server/collect.js');
const cuisine = require('./server/cuisine.js');
const feedback = require('./server/feedback.js');

cloud.init({
  env: 'recipes'
});

const db = cloud.database();
const wxContext = cloud.getWXContext();
collect._init(cloud, db, wxContext);
cuisine._init(cloud, db, wxContext);
feedback._init(cloud, db, wxContext);

// 云函数入口函数
exports.main = async(event, context) => {

  const app = new tcbRouter({
    event
  });


  // collect   添加进收藏
  app.router('collect/add', collect._add);
  // 查询收藏菜品列表 根据用户id
  app.router('collect/get', collect._get);
  // 删除收藏 根据_id
  app.router('collect/remove', collect._remove);

  // cuisine   根据搜索内容 获取菜品列表
  app.router('cuisine/search', cuisine._search);
  // 根据id 获取菜品详情
  app.router('cuisine/getDeatil', cuisine._getDeatil);
  // 根据类型获取热门菜品列表 降序
  app.router('cuisine/getListByType', cuisine._getListByType);
  // 根据当前时间 推荐类型
  app.router('cuisine/getNow', cuisine._getNow);
  // 获取热门菜品 降序
  app.router('cuisine/getHot', cuisine._getHot);
  // 获取类型并获取最热菜品图
  app.router('cuisine/getType', cuisine._getType);

  // feedback   添加建议
  app.router('feedback/add', feedback._add);

  return app.serve();
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}