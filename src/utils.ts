export function APIHost(): string {
  if (!!process.env.NODE_ENV) {
    const dotenv = require('dotenv');
    dotenv.config();

    return process.env.HOST

  } else {
    return '/api/'
  }  
}
