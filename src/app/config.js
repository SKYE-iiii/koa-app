/** dotenv 是一个零依赖的模块，它将环境变量从 .env 文件加载到 process.env 中. */
const dotenv = require("dotenv");
dotenv.config();

const { APP_PORT } = process.env;

module.exports = { APP_PORT };
