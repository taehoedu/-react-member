const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("*", {
      target: "http://14.42.124.123:8090",
      changeOrigin: true,
    })
  );
};