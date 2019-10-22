export function APIHost(): string {
  if (!!process.env.NODE_ENV) {
    const dotenv = require('dotenv');
    dotenv.config();

    console.log(process.env.HOST)
    
    return process.env.HOST

  } else {
    return '/api/'
  }  
}
