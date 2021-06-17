module.exports = {
  webpack: function (config, env) {
    if (env === "production") {
      config.output.publicPath = "/Small-Step-Planner/";
    }

    return config;
  },
};
