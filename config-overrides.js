const path = require("path");

module.exports = {
  paths: function (paths, env) {
    paths.publicPath = path.resolve(__dirname, "/Small-Step-Planner/");
    return paths;
  },
};
