const fs = require('fs-extra')

// Async with promises:
fs.copy('./src/packages/_base/base.scss', './dist/es/components/_base')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))
