const router = require('express').Router()

/**
 * @abstract GET api / profile
 */

router.get('/', (req, res) => {
  res.send('Profile route')
})

module.exports = router
