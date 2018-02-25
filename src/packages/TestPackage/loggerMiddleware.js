import debug from 'debug'

const log = debug('APP:TESTPACKAGE')

function loggerMiddleware () {
  return store => next => action => {
    log('Dispatch %O', action)
    const res = next(action)
    log('Result', res)
    return res
  }
}

export default loggerMiddleware
