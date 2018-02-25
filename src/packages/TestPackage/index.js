import Package from 'core/Package'
import HomeView from './homeView'
import NotFound from './NotFound'

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
      }
    }
  }

  routeNotFoundPage () {
    return [NotFound]
  }
}

export default TestPackage
