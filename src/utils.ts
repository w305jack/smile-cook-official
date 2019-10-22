require('dotenv').config();

process.env.VUE_APP_API_URL = require('../package.json').apiUrl

export function APIHost(): string {
  if (!!process.env.NODE_ENV) {

    console.log('vue:' + process.env.VUE_APP_SECRET)

    console.log('url:' + process.env.VUE_APP_API_URL)

    return process.env.API_URL

  } else {
    return '/api/'
  }  
}
