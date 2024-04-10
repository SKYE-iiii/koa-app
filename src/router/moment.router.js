/*
 * @Description: 动态相关路由
 * @Author: zyj
 * @Date: 2024-03-22 14:11:53
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-10 09:48:09
 * @FilePath: \koa-app\src\router\moment.router.js
 */
const {
  publishMoment,
  getMomentDetail,
  getMomentList,
  updateMoment,
  deleteComment,
  getMomentDetailById,
} = require("../controller/moment.controller");
const Router = require("koa-router");
const { verifyToken, verifyAuthor } = require("../middleware/auth.middleware");
const momentRouter = new Router({ prefix: "/moment" });

/** 发布动态 */
momentRouter.post("/", verifyToken, publishMoment);
/** 获取动态详情 */
// momentRouter.get("/:id", verifyToken, getMomentDetail);
/** 获取动态详情 - 带评论列表 */
momentRouter.get("/:momentId", verifyToken, getMomentDetailById);
/** 获取动态列表 */
momentRouter.get("/", verifyToken, getMomentList);
/** 更新动态 : 校验作者(只允许发布者进行修改) , 更新动态 */
momentRouter.put("/", verifyToken, verifyAuthor("moments"), updateMoment);
momentRouter.delete(
  "/:id",
  verifyToken,
  verifyAuthor("moments"),
  deleteComment
);

module.exports = momentRouter;
