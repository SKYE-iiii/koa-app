/*
 * @Description: 生成非对称密钥
 * @Author: zyj
 * @Date: 2024-03-21 14:01:19
 * @LastEditors: zyj
 * @LastEditTime: 2024-03-21 14:09:29
 * @FilePath: \koa-app\src\keys\generateKeys.js
 */

const NodeRSA = require("node-rsa");
const fs = require("fs");

const key = new NodeRSA({ b: 1024 });
const keyPair = key.generateKeyPair();
const PRIVATE_KEY = keyPair.exportKey("private");
const PUBLIC_KEY = keyPair.exportKey("public");

fs.writeFileSync(__dirname + "/private.pem", PRIVATE_KEY);
fs.writeFileSync(__dirname + "/public.pem", PUBLIC_KEY);
