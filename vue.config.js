const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
              @import "@/assets/scss/common.scss";
            `,
      },
    },
  },
  filenameHashing: true,
  configureWebpack: (config) => {
    config.output.filename = 'js/[name].[hash].js';
    config.output.chunkFilename = 'js/[name].[hash].js';
  },
  pwa: {
    name: 'ATNP EasyWork',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',

    // appleMobileWebAppStatusBarStyle: 'black',
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   swSrc: 'public/sw.js',
    //   exclude: [/_redirects/, /\.map$/, /manifest\.json$/],
    // },
  },
  //webpack gql file
  chainWebpack: (config) => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  },
});
