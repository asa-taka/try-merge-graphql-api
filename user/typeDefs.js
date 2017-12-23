module.exports = `

scalar DateTime

type User {
  id: ID!
  name: String!
  created: DateTime!
  updated: DateTime!
}

input UserInput {
  id: ID!
  name: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User!
}

type Mutation {
  createUser(input: UserInput!): User!
}

`
