const errorHandler = (error, ctx) => {
  console.log(error.message, "err");
  ctx.body = error.message;
};

module.exports = errorHandler;
