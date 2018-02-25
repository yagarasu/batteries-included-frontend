import Package from 'core/Package'
import HomeView from './homeView'
import counterReducer from './counterDuck'
import CounterContainer from './CounterContainer'
import NotFound from './NotFound'
import RandomNumService from './RandomNumService'
import loggerMiddleware from './loggerMiddleware'

class TestPackage extends Package {
  static info: {
    description: 'A sample package to test all features',
    weight: 0
  }

  routes () {
    return {
      'TESTPACKAGE:HOME': {
        path: '/',
        component: HomeView
      },
      'TESTPACKAGE:COUNTER': {
        path: '/counter',
        component: CounterContainer
      }
    }
  }

  middlewares () {
    return [
      loggerMiddleware()
    ]
  }

  reducers () {
    return {
      counter: counterReducer
    }
  }

  routeNotFoundPage () {
    return [NotFound]
  }

  services () {
    return {
      RandomNum: RandomNumService
    }
  }
}

export default TestPackage
