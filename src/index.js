import Application from 'core/Application'
import TestPackage from 'packages/TestPackage'

const app = new Application()
app
  .registerMany([
    TestPackage
  ])
  .mount(document.getElementById('app'))
