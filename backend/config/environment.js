const port = process.env.PORT || 4000
const dbURIPrefix = 'mongodb://localhost:27017/'
const dbName = 'project3'
const dbURI = process.env.MONGODB_URI || `${dbURIPrefix}${dbName}`

const secret = 'juicy'

module.exports = {
  port,
  dbURI,
  secret
}