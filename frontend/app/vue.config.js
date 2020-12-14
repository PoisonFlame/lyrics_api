module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            "/api/" : {
                target: "https://api.rpsh.me/lyrics/v1/",
                pathRewrite:{
                    "^/api":''
                }
            }
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
          }
    },
    
}