import Application from 'core/Application'
import TestPackage from 'packages/TestPackage'

const app = new Application()
app
  .registerMany([
    TestPackage
  ])
  .bootstrap()
  .mount(document.getElementById('app'))
