const Router = require("koa-router");
const { login, permissionList } = require("../controller/auth.controller");
const { judgingEmpty } = require("../middleware/judgingEmpty.middleware.js");
const { verifyLogin, verifyToken } = require("../middleware/auth.middleware");
const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/login", judgingEmpty, verifyLogin, login);
authRouter.get("/permission", verifyToken, permissionList);
module.exports = authRouter;
