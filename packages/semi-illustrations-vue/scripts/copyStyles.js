const fs = require('fs-extra')

// Async with promises:
fs.copy('./src/icons/styles', './lib/styles')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))
