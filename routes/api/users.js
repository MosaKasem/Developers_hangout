const router = require('express').Router()
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

/**
 * @route POST api / users
 * @desc Register
 */

router.post('/',
  [
      // Username
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Valid email is required')
        .isEmail(),
    check('password', 'Password to be minimum of six characters or more')
        .isLength({min: 6})
  ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    try {
      let user = await User.findOne({email})
      if (user) res.status(400).json({errors: [{msg: 'User already exists'}]})

      const avatar = gravatar.url(email, {
        s: 200,
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

      user.password = await bcrypt.hash(password, bcrypt.genSalt(10))

      await user.save()

      res.send('Users route')
    } catch (error) {
      console.log('error: ', error)
      res.status(500).send('Server error')
    }
  })

module.exports = router
