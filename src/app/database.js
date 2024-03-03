/** 使用mysql2创建连接池 */
const mysql = require("mysql2");
const config = require("./config.js");
const connectionConfig = {
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
};
const connections = mysql.createPool(connectionConfig);

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL server successfully!");
  });
});

module.exports = connections.promise();
