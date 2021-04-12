const express = require('express');
const bodyParser = require("body-parser")
const app = express();

const player = require("./controller/player")

app.use(bodyParser.json())

// 挂载日志模块
app.use(async (req, res, next) => {
  req.util = {
    log: require('./utils/logs')
  }
  await next()
})

// 记录日志
app.use(async (req, res, next) => {
  req.util.log.info(req.method, req.ip, req.url)
  console.info(new Date(), req.ip, req.method, req.url);
  await next()
})

app.use("/",player)

app.get('/', (req, res) => {
    res.json({"message": "Building a RESTful CRUD API with Node.js, Express/Koa and MongoDB."});
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});