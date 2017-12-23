const { v4: uuid } = require('uuid')

const inputToEntry = input => {
  const id = uuid()
  return Object.assign({}, input, { id })
}

const docs = [
  { title: 'good doc', authorId: 'a', content: 'gooood' },
].map(inputToEntry)

const findDocument = id => {
  const doc = docs.find(e => e.id === id)
  if (!doc) throw new Error('Document not found')
  return doc
}

const resolvers = {
  Query: {
    documents(_, { authorId }) {
      const tests = []
      if (authorId) tests.push(e => e.authorId === authorId)
      return tests.reduce((rest, test) => rest.filter(test), docs)
    },
    document(_, { id }) {
      return findDocument(id)
    }
  },
  Mutation: {
    createDocument(_, { input }) {
      docs.push(input)
      return input
    }
  }
}

module.exports = resolvers
