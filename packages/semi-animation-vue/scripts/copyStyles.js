const fs = require('fs-extra')

// Async with promises:
fs.copy('./src/packages/icons/styles', './dist/es/styles')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))
