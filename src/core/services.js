import debug from 'debug'
import Bottle from 'bottlejs'

const log = debug('APP:SERVICES')

export const injectDependencyInThunkMiddleware = (app) => {
  return store => next => action => {
    if (typeof action === 'function') {
      return next(action(app.bottle.container))
    }
    return next(action)
  }
}

export default (app) => {
  log('Registering services')
  app.bottle = new Bottle()
  const services = app.mergeHook('services')
  const serviceNames = Object.keys(services)
  log('%d services found', serviceNames.length)
  serviceNames.forEach((serviceName) => {
    const service = services[serviceName]
    const dependencies = service.dependencies || []
    log('Register %s. Dependencies: %s', serviceName, (dependencies.length) ? dependencies.join(', ') : 'none')
    app.bottle.service(serviceName, service, ...dependencies)
  })
}
