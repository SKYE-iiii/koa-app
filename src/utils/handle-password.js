/**
 * 加密密码
 * crypto : node自带的库 提供了加密功能
 *
 * crypto.createHash 创建并返回 Hash 对象，该对象可用于使用给定的 algorithm 生成哈希摘要。
 *
 * hash.update(data[, inputEncoding]) : 使用给定的 data 更新哈希内容，其编码在       inputEncoding 中给出。
 * 如果未提供 encoding，且 data 是字符串，则强制为 'utf8' 编码。
 * 如果 data 是 Buffer、TypedArray 或 DataView，则忽略 inputEncoding。
 *
 * hash.digest([encoding]) : 计算传给被哈希的所有数据的摘要
 *
 */
const crypto = require("crypto");

const md5Password = (password) => {
  return crypto.createHash("md5").update(password).digest("hex");
};

module.exports = {
  md5Password,
};
