/*
 * @Description: 动态相关路由
 * @Author: zyj
 * @Date: 2024-03-22 14:11:53
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-25 15:24:10
 * @FilePath: \koa-app\src\router\moment.router.js
 */
const {
  publishMoment,
  getMomentDetail,
  getMomentList,
  updateMoment,
} = require("../controller/moment.controller");
const Router = require("koa-router");
const { verifyToken } = require("../middleware/auth.middleware");
const {verifyAuthor} =require('../middleware/moment.middleware')
const momentRouter = new Router({ prefix: "/moment" });

/** 发布动态 */
momentRouter.post("/", verifyToken, publishMoment);
/** 获取动态详情 */
momentRouter.get("/:id", verifyToken, getMomentDetail);
/** 获取动态列表 */
momentRouter.get("/", verifyToken, getMomentList);
/** 更新动态 : 校验作者(只允许发布者进行修改) , 更新动态 */
momentRouter.put("/", verifyToken, verifyAuthor, updateMoment);

module.exports = momentRouter;
 