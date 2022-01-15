const webpack = require('webpack')

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  },
  // css: {
  //   loaderOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "@/assets/scss/main.scss";
  //       `
  //     }
  //   }
  // }
}
