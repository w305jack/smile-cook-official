module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://smile-cook-api.herokuapp.com/',
        pathRewrite: { '^/api/': '' }
      }
    }
  }
};