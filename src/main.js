/*
 * @Description:
 * @Author: zyj
 * @Date: 2024-03-04 10:30:37
 * @LastEditors: zyj
 * @LastEditTime: 2024-04-16 11:08:12
 * @FilePath: \koa-app\src\main.js
 */
const app = require("./app/index.js");
const config = require("./app/config.js");
/** 注册database */
require("./app/database.js");

app.listen(config.APP_PORT, () => {
  console.log("koa初体验服务器已启动");
});
