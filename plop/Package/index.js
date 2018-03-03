var path = require('path');

module.exports = {
  description: 'A package',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Package name',
      validate: (val) => val.trim() !== ''
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: ''
    },
    {
      type: 'confirm',
      name: 'hasService',
      message: 'Does it has services?',
      default: false
    },
    {
      type: 'confirm',
      name: 'hasDuck',
      message: 'Does it has redux-ducks?',
      default: false
    },
    {
      type: 'confirm',
      name: 'hasMiddleware',
      message: 'Does it has middlewares?',
      default: false
    }
  ],
  actions: [{
    type: 'add',
    path: 'src/packages/{{pascalCase name}}/index.js',
    templateFile: path.join(__dirname, 'Package.js.hbs')
  }]
};
