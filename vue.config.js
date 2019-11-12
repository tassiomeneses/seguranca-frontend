module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${process.env.VUE_APP_BASE_PATH}` : '/',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  }
}
