const express = require('express')
const graphqlHTTP = require('express-graphql')

const serveGraphql = ({ port, schema }) => {
  const app = express()

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }))

  app.listen(port);
  console.log(`localhost:${port}/graphql`)
}

module.exports = {
  serveGraphql,
}
