const { v4: uuid } = require('uuid')

const users = [
  { id: 'a', name: 'asa-taka' },
  { id: 'b', name: 'bob' },
  { id: 'c', name: 'candy-nu' },
]

const findUser = id => {
  const user = users.find(e => e.id === id)
  if (!user) throw new Error('User not found')
  return user
}

const resolvers = {
  Query: {
    users() {
      return users
    },
    user(_, { id }) {
      return findUser(id)
    }
  },
  Mutation: {
    createUser(_, { input }) {
      users.push(input)
      return input
    }
  }
}

module.exports = resolvers
