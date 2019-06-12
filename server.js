const express = require('express')
const connect = require('./config/db')

const app = express()
connect.run()

const PORT = process.env.PORT || 8080
app.use(express.json({extended: false}))
app.get('/', (req, res) => res.send('API running'))
/**
 * @abstract Routes
 */
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
