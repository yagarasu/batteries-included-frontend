import 'react'
import ReactDom from 'react-dom'

const getPackageWeight = (packageInstance) => (packageInstance.info && packageInstance.info.weight) || 0

class Application {
  constructor () {
    this.packages = {}
    this.flags = {
      bootstrapped: false
    }
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
    this.invokeHook('prebootstrap')
    // Create history
    // Bootstrap services
    this.mark('bootstrapped')
    this.invokeHook('postbootstrap')
  }

  mount (domElement) {
    // ReactDOM
    ReactDom.render(
      <div>ok</div>
    , domElement)
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
      if (typeof pacpackageInstancekage[hook] === 'function') packageInstance[hook](...params)
    })
  }

  composeHook (hook, ...params) {
    this.getSortedPackages()
    .reduce((prev, packageInstance) => {
      if (typeof packageInstance[hook] === 'function') {
        return [...prev, ...packageInstance[hook](...params)]
      }
      return prev
    }, [])
  }

  mergeHook (hook, ...params) {
    this.getSortedPackages()
    .reduce((prev, packageInstance) => {
      if (typeof packageInstance[hook] === 'function') {
        return { ...prev, ...packageInstance[hook](...params) }
      }
      return prev
    })
  }

  perPackageHook (hook, ...params) {
    this.getSortedPackages()
    .reduce((prev, packageInstance) => {
      const packageName = packageInstance.name
      if (typeof packageInstance[hook] === 'function') {
        return { ...prev, [packageName]: packageInstance[hook](...params) }
      }
      return prev
    })
  }
}

export default Application
