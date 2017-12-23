const userSchema = require('./user/schema')
const docSchema = require('./document/schema')

const { serveGraphql } = require('./utils')

const apiDefs = [
  { schema: userSchema, port: 4000 },
  { schema: docSchema, port: 5000 },
]

apiDefs.forEach(serveGraphql)
