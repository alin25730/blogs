module.exports = {
    css: {
      loaderOptions: {
        postcss: {
            plugins: [
                require("postcss-px2rem")({
                    remUnit: 192  // 如果设计稿是1920 这里就是192
                })
            ]
        }
      } 
  },
  devServer: {
    open: true,
    port: 8080,
    host: 'localhost',
    https: false,
    hotOnly:false,
    proxy: {
        '/api': { //用/api代替服务端真实地址
            target: `http://localhost:5000/api/`, //服务端真实地址
            ws:true,
            changeOrigin: true, //运行跨域
            pathRewrite: {
                '^/api': '' //请求的时候，地址重写
            }
        }
    }
}
  }