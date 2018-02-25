import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { injectDependencyInThunkMiddleware } from 'core/services'
import debug from 'debug'

const log = debug('APP:STORE')

const getStore = (app, packagesReducers = {}, packagesMiddlewares = [], packageEnhancers = [])  => {
  // Reducers
  log('%d reducers found in packages: %s', Object.keys(packagesReducers).length, Object.keys(packagesReducers).join(', '))
  const reducers = combineReducers({
    ...packagesReducers
  })

  // Middlewares
  const sortedMiddlewares = packagesMiddlewares
    .sort((a, b) => {
      const aw = a.weight || 0
      const bw = b.weight || 0
      return b - a
    })
  const justMiddlewares = sortedMiddlewares.map(m => m.middleware)
  log('%d middlewares found in packages: %s', packagesMiddlewares.length, sortedMiddlewares.map(m => m.name).join(', '))
  const middlewares = applyMiddleware(
    injectDependencyInThunkMiddleware(app),
    thunk,
    ...justMiddlewares
  )

  // Enhancers
  log('%d store enhancers found in packages.', packageEnhancers.length)
  return createStore(reducers, compose(...packageEnhancers, middlewares))
}

export default getStore
