export function APIHost(): string {
  if (!!process.env.NODE_ENV) {
    return process.env.HOST
  } else {
    return '/api/'
  }
}
