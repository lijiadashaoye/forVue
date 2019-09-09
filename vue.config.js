const ZipPlugin = require('zip-webpack-plugin') // 将文件打包称zip压缩包插件
const path = require('path')

module.exports = {
    publicPath: "./",
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'release') {
            config.plugins.push(
                new ZipPlugin({
                    path: path.join(__dirname),
                    filename: 'dist.zip'
                })
            );
        }
    }
};