/**
 *  判空
 * @param {*} value
 * @returns
 */
const isEmpty = (value) => {
  return !value || value === "";
};

/**
 *  密码校验
 * @param {*} password
 * @returns
 * 正则解读 : 
 * ^: 匹配字符串的开头
 * (?=.*[a-z]): 使用正向预查确保字符串中至少包含一个小写字母
 * (?=.*[A-Z]): 使用正向预查确保字符串中至少包含一个大写字母
 * .{6,}: 匹配长度至少为6的任意字符
 * $: 匹配字符串的结尾
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const validatePassword = (password) => {
  return passwordRegex.test(password);
};

module.exports = {
  isEmpty,
  validatePassword,
};
