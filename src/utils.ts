export function APIHost(): string {
  console.log('env:' + process.env.NODE_ENV)
  for (var i=0; i<process.env.length; i++) {
    console.log('host:' + process.env)
  }
  if (!!process.env.NODE_ENV) {
    return process.env.HOST
  } else {
    return '/api/'
  }  
}
