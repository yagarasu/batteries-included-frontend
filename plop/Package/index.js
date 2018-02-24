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
    }
  ],
  actions: [{
    type: 'add',
    path: 'src/packages/{{pascalCase name}}/index.js',
    templateFile: path.join(__dirname, 'Package.js.hbs')
  }]
};
