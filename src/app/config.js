/** dotenv 是一个零依赖的模块，它将环境变量从 .env 文件加载到 process.env 中. */
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
/** __dirname 当前文件的路径 */
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.pem")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/public.pem")
);

const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PUBLIC_KEY,
  PRIVATE_KEY,
};
