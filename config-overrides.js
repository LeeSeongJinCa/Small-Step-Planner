module.exports = {
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.publicPath = "/Small-Step-Planer/";
      return config;
    };
  },
};
