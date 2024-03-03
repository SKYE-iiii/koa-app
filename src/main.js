const app = require("./app/index.js");
const config = require("./app/config.js");

app.listen(config.APP_PORT, () => {
  console.log("koa初体验服务器已启动");
});
 