const router = require('express').Router()

/**
 * @abstract GET api / posts
 */

router.get('/', (req, res) => {
  res.send('Posts route')
})

module.exports = router
