const fs = require("fs");

/**
 *
 * @param {*} app koa实例
 * __dirname : 当前文件所在的目录
 * fs.readdirSync(__dirname) : 返回当前文件所在目录下的文件列表
 *  require(`./${file}`) : 每个文件都是一个模块并导出了一个路由对象
 */
const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = useRoutes;
