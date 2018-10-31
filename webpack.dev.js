const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require('path');

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true
    },
    mode: "development",
    devtool: "inline-source-map"
});