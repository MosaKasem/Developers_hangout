const router = require('express').Router()

const {check, validationResult} = require('express-validator/check')
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const User = require('../../models/User')

/**
 * @abstract POST api / posts
 */
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]],
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

  try {
    const user = await User.findById(req.user.id).select('-password')

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })

    const post = await newPost.save()
    res.json(post)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract GET api / posts
 */
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1})
    res.json(posts)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract GET api / post
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({msg: 'Post not found'})
    res.json(post)
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({msg: 'Post not found'})
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract DELETE api / posts
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      console.log('Post dosnt exist', post)
      return res.status(404).json({msg: 'Post not found'})
    } else if (post.user.toString() !== req.user.id) {
      console.log('Post ID doesnt match user ID', post)
      return res.status(401).json({msg: 'User not authorized'})
    } else {
      await post.remove()
      console.log('Post was removed', post)
      res.json({msg: 'Post removed'})
    }
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({msg: 'Post not found'})
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract PUT api / posts /like/:id
 */
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // console.log('post: ', post.likes.filter(like => like.user.toString() === req.user.id).length)

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({msg: 'Post already liked'})
    }

    post.likes.unshift({user: req.user.id})
    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract PUT api / posts /like/:id
 */
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // console.log('post: ', post.likes.filter(like => like.user.toString() === req.user.id).length)

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({msg: 'Post has not yet been liked'})
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)
    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

/**
 * @abstract POST api / posts / comment / :id
 */
router.post('/comment/:id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment)
      await post.save()

      res.json(post.comments)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  })

/**
 * @abstract POST api / posts / comment / :id /:comment_id
 */
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // get ID from comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id)
    if (!comment) return res.status(404).json({msg: 'Comment does not exist'})

    console.log('comment.user.toString(): ', comment.user.toString())
    console.log('req.user.id: ', req.user.id)
    // is user requesting deleting comment, owns the comment?
    if (comment.user.toString() !== req.user.id) return res.status(401).json({msg: 'User not authorized'})

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

    post.comments.splice(removeIndex, 1)
    await post.save()
    res.json(post.comments)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
