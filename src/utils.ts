require('dotenv').config();

export function APIHost(): string {
  if (!!process.env.NODE_ENV) {

    console.log(process.env.HOST)

    return process.env.HOST

  } else {
    return '/api/'
  }  
}
