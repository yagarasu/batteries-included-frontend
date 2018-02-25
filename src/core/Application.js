import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import debug from 'debug'

import getStore from 'core/store'
import Routing from 'core/packages/Routing'

const log = debug('APP:MAIN')

const getPackageWeight = (packageInstance) => (packageInstance.info && packageInstance.info.weight) || 0

class Application {
  constructor () {
    this.packages = {}
    this.store = null
    this.flags = {
      bootstrapped: false
    }
    // Register core packages
    this.register(Routing)
  }

  is (flag) {
    return this.flags[flag] || false
  }
  mark (flag) {
    this.flags[flag] = true
  }
  unmark (flag) {
    this.flags[flag] = false
  }

  bootstrap () {
    log('Bootstrapping.')
    this.invokeHook('prebootstrap')
    // Bootstrap services
    // Create store
    log('Creating redux store')
    const reducers = this.mergeHook('reducers')
    const middlewares = this.combineHook('middlewares')
    const storeEnhancers = this.combineHook('storeEnhancers')
    this.store = getStore(reducers, middlewares, storeEnhancers)
    this.mark('bootstrapped')
    this.invokeHook('postbootstrap')
    return this
  }

  mount (domElement) {
    if (!this.is('bootstrapped')) {
      throw new Error('Bootstrapping is required to mount.')
    }
    log('Mount.')
    const RootComponent = this.getRootComponent((props) => null)
    ReactDom.render(
      <Provider store={this.store}>
        <div>
          <RootComponent />
          <pre>{JSON.stringify(this.store.getState(),null,2)}</pre>
        </div>
      </Provider>
    , domElement)
    return this
  }

  getRootComponent (DefaultComponent) {
    const composers = this.combineHook('rootComponent')
    return composers.reduce((prev, composer) => composer(prev), DefaultComponent)
  }

  register (PackageClass) {
    if (this.is('bootstrapped')) {
      throw new Error('Registering packages must occur before bootstrapping.')
    }
    const packageName = PackageClass.name
    if (this.packages[packageName]) {
      throw new Error('Package "' + packageName + '" already registered.')
    }
    this.packages[packageName] = new PackageClass(this)
    return this
  }

  registerMany (packageClasses) {
    if (this.is('bootstrapped')) {
      throw new Error('Registering packages must occur before bootstrapping.')
    }
    packageClasses.forEach(packageClass => this.register(packageClass))
    return this
  }

  resolve (packageName) {
    if (this.packages[packageName]) {
      return this.packages[packageName]
    }
    throw new Error('Package "' + packageName + '" is not registered.')
  }

  getSortedPackages () {
    return Object.values(this.packages)
    .sort((a, b) => {
      const aw = getPackageWeight(a)
      const bw = getPackageWeight(b)
      return bw - aw
    })
  }

  invokeHook (hook, ...params) {
    this.getSortedPackages()
    .forEach((packageInstance) => {
      if (typeof packageInstance[hook] === 'function') packageInstance[hook](...params)
    })
  }

  combineHook (hook, ...params) {
    return this.getSortedPackages()
    .reduce((prev, packageInstance) => {
      if (typeof packageInstance[hook] === 'function') {
        return [...prev, ...packageInstance[hook](...params)]
      }
      return prev
    }, [])
  }

  mergeHook (hook, ...params) {
    return this.getSortedPackages()
    .reduce((prev, packageInstance) => {
      if (typeof packageInstance[hook] === 'function') {
        return { ...prev, ...packageInstance[hook](...params) }
      }
      return prev
    }, {})
  }

  perPackageHook (hook, ...params) {
    return this.getSortedPackages()
    .reduce((prev, packageInstance) => {
      const packageName = packageInstance.name
      if (typeof packageInstance[hook] === 'function') {
        return { ...prev, [packageName]: packageInstance[hook](...params) }
      }
      return prev
    }, {})
  }
}

export default Application
