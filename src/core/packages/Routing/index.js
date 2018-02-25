import createHistory from 'history/createBrowserHistory'
import { connectRoutes } from 'redux-first-router'
import Package from 'core/Package'
import pageSwitch from './pageSwitch'
import DefaultNotFoundPage from './DefaultNotFound'
import debug from 'debug'

const log = debug('APP:ROUTING')

class Routing extends Package {
  static info: {
    description: 'Core routing',
    weight: 0
  }

  constructor (app) {
    super(app)
    this.app = app
  }

  prebootstrap () {
    log('Create history.')
    this.app.history = createHistory()
    const { slugToPath } = this.getRoutingMaps()
    log('%d routes found', Object.keys(slugToPath).length)
    this.reduxFirstRouter = connectRoutes(this.app.history, slugToPath)
  }

  getRoutingMaps () {
    const packagesRoutes = this.app.mergeHook('routes')
    const slugToPath = {}
    const slugToComponent = {}
    Object.keys(packagesRoutes).forEach((slug) => {
      const route = packagesRoutes[slug]
      slugToPath[slug] = route.path
      slugToComponent[slug] = route.component
    })
    return { slugToPath, slugToComponent }
  }

  getNotFoundPage () {
    const notFoundPages = this.app.combineHook('routeNotFoundPage')
    if (notFoundPages.length === 0) return DefaultNotFoundPage
    return notFoundPages[0]
  }

  rootComponent () {
    const { slugToComponent } = this.getRoutingMaps()
    const notFoundPage = this.getNotFoundPage()
    return [
      pageSwitch(slugToComponent, notFoundPage)
    ]
  }

  reducers () {
    return {
      location: this.reduxFirstRouter.reducer
    }
  }

  middlewares () {
    return [
      this.reduxFirstRouter.middleware
    ]
  }

  storeEnhancers () {
    return [
      this.reduxFirstRouter.enhancer
    ]
  }
}

export default Routing
