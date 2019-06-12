const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

module.exports.run = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log('MongoDB Connected...')
  } catch (error) {
    console.log(error.message)
    process.exit(1) // Exit procss if error
  }
}
