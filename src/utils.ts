export function APIHost(): string {
  console.log('env:' + process.env.NODE_ENV)
  console.log('host:' + process.env.HOST)
  console.log('test:' + process.env.TEST)

  if (!!process.env.NODE_ENV) {
    return process.env.HOST
  } else {
    return '/api/'
  }  
}
