import createHistory from 'history/createBrowserHistory'
import { connectRoutes } from 'redux-first-router'
import Package from 'core/Package'

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
    this.app.history = createHistory()
    this.reduxFirstRouter = connectRoutes(this.app.history, {
      'ROUTING:ROUTE:HOME': '/'
    })
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
