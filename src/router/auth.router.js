const Router = require("koa-router");
const { login } = require("../controller/auth.controller");
const { judgingEmpty } = require("../middleware/judgingEmpty.middleware.js");
const { verifyLogin } = require("../middleware/auth.middleware");
const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/login", judgingEmpty, verifyLogin, login);

module.exports = authRouter;
