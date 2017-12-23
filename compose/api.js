const { createApolloFetch } = require('apollo-fetch')

const {
  makeRemoteExecutableSchema,
  introspectSchema,
  addMockFunctionsToSchema,
  mergeSchemas,
} = require('graphql-tools')

const { serveGraphql } = require('../utils')

const fetchSchema = async uri => {
  const fetcher = createApolloFetch({ uri })
  const schema = await introspectSchema(fetcher)
  return makeRemoteExecutableSchema({ schema, fetcher })
}

const uris = [
  'http://localhost:4000/graphql',
  'http://localhost:5000/graphql',
]

const linkTypeDefs = `
  extend type User {
    documents: [Document!]!
  }
  extend type Document {
    author: User!
  }
`

const resolvers = mergeInfo => ({
  User: {
    documents: {
      fragment: `fragment UserFragment on User { id }`,
      resolve(parent, args, context, info) {
        const authorId = parent.id
        return mergeInfo.delegate(
          'query', 'documents', { authorId },
          context, info,
        )
      }
    }
  },
  Document: {
    author: {
      fragment: `fragment DocumentFragment on Document { authorId }`,
      resolve(parent, args, context, info) {
        const id = parent.authorId
        return mergeInfo.delegate(
          'query', 'user', { id },
          context, info,
        )
      }
    }
  }
})

Promise.all(uris.map(fetchSchema))
  .then(schemas => {
    const schema = mergeSchemas({
      schemas: [...schemas, linkTypeDefs],
      resolvers,
      onTypeConflict(left, right) {
        console.log(left)
        return left
      }
    })
    console.log(schema)
    serveGraphql({ schema, port: 10000 })
  })
  .catch(console.error)
