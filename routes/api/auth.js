const router = require('express').Router()

/**
 * @abstract GET api / auth
 */

router.get('/', (req, res) => {
  res.send('Auth route')
})

module.exports = router
