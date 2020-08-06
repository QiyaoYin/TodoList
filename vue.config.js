const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    publicPath:'',
    devServer:{
        host:'0.0.0.0',
        port:3000,
    }, 
    css: {
        loaderOptions: {
            stylus: {
                import: "~@/assets/css/global.styl"
            }
        }
    },
    configureWebpack: config=>{
        config.plugins.forEach(val=>{
            if(val instanceof HtmlWebpackPlugin){
                val.options.title = "to do list";
            }
        })
    }
}