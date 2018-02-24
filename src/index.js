import Application from 'core/Application'
import Routing from 'packages/Routing'
import TestPackage from 'packages/TestPackage'

const app = new Application()
app
  .registerMany([
    Routing,
    TestPackage
  ])
  .bootstrap()
  .mount(document.getElementById('app'))
