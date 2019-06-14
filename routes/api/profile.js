const router = require('express').Router()
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator/check')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

/**
 * @abstract GET api / profile / me
 */

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
    if (!profile) return res.status(400).json({msg: 'User does not exist'})

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract POST api / profile
 */

router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
]],
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({msg: errors.array()})

      const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body

      const profileFields = {}
      profileFields.user = req.user.id
      if (company) profileFields.company = company
      if (website) profileFields.website = website
      if (location) profileFields.location = location
      if (bio) profileFields.bio = bio
      if (status) profileFields.status = status
      if (githubusername) profileFields.githubusername = githubusername
      if (skills) {
        profileFields.skills = skills.split(',').map(skills => skills.trim())
      }

      profileFields.social = {}
      if (youtube) profileFields.social.youtube = youtube
      if (twitter) profileFields.social.twitter = twitter
      if (facebook) profileFields.social.facebook = facebook
      if (linkedin) profileFields.social.linkedin = linkedin
      if (instagram) profileFields.social.instagram = instagram

      try {
        let profile = await Profile.findOne({user: req.user.id})

        if (profile) {
          profile = await Profile.findOneAndUpdate({user: req.user.id}, { $set: profileFields }, {new: true})
          return res.json(profile)
        }

        profile = new Profile(profileFields)
        await profile.save()

        res.json(profile)
      } catch (error) {
        res.send(500).send('Server error')
      }
    })

/**
 * @abstract GET api / profile
 */

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.send(500).send('Server error')
  }
})

/**
 * @abstract GET api / profiles / user / :user_id
 */

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
    if (!profile) return res.status(400).json({msg: 'Profile not found'})

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    if (error.kind === 'ObjectId') return res.status(400).json({msg: 'Profile not found'})
    res.send(500).send('Server error')
  }
})

/**
 * @abstract DELETE api / profile / user / :user_id
 */
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({user: req.user.id})
    await User.findOneAndRemove({_id: req.user.id})
    res.json({msg: 'User deleted'})
  } catch (error) {
    console.error(error.message)
    res.send(500).send('Server error')
  }
})

/**
 * @abstract PUT api / profile / user / :user_id
 */
router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors) return res.status(400).json({ errors: errors.array() })

  const {
      title,
      company,
      location,
      from,
      to,
      current,
      descriptiony
  } = req.body

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    descriptiony
  }

  try {
    const profile = await Profile.findOne({user: req.user.id})
    profile.experience.unshift(newExp)

    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.send(500).send('Server error')
  }
})

module.exports = router
