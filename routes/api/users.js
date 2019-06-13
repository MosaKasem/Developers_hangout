const router = require('express').Router()
const {check, validationResult} = require('express-validator/check')
const User = require('../../models/User')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

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
      if (user) return res.status(400).json({errors: [{msg: 'User already exists'}]})

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

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
          payload,
          config.get('jwtSecret'),
          {expiresIn: 360000},
          (err, token) => {
            if (err) throw err
            res.json({token})
          })
    } catch (error) {
      console.log('error: ', error)
      res.status(500).send('Server error')
    }
  })

module.exports = router
