require('dotenv').config();

export function APIHost(): string {
  if (!!process.env.NODE_ENV) {

    console.log(process.env.API_URL)

    return process.env.API_URL

  } else {
    return '/api/'
  }  
}
