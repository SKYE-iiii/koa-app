const app = require("./app/index.js");
const config = require("./app/config.js");
/** 注册database */
require("./app/database.js");

app.listen(config.APP_PORT, "127.0.0.2", () => {
  console.log("koa初体验服务器已启动");
});
