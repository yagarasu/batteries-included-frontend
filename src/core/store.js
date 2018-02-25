import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { injectDependencyInThunkMiddleware } from 'core/services'
import debug from 'debug'

const log = debug('APP:STORE')

const getStore = (app, packagesReducers = {}, packagesMiddlewares = [], packageEnhancers = [])  => {
  log('%d reducers found in packages: %s', Object.keys(packagesReducers).length, Object.keys(packagesReducers).join(', '))
  const reducers = combineReducers({
    ...packagesReducers
  })
  log('%d middlewares found in packages', packagesMiddlewares.length)
  const middlewares = applyMiddleware(
    injectDependencyInThunkMiddleware(app),
    thunk,
    ...packagesMiddlewares
  )

  log('%d store enhancers found in packages.', packageEnhancers.length)
  return createStore(reducers, compose(...packageEnhancers, middlewares))
}

export default getStore
