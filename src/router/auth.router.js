const Router = require("koa-router");
const { login } = require("../controller/auth.controller");
const authRouter = new Router({
  prefix: "/auth",
});

authRouter.post("/login", login);

module.exports = authRouter;
