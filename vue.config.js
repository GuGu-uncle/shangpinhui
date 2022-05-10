//  Element Plus自动按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    // 不打包map文件
    productionSourceMap:false,
    // lintOnSave:false,//关闭eslint语法检查
    // 代理跨域
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn"
            }
        }
    },
    // Element Plus自动按需引入\
    configureWebpack:{
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }
}
