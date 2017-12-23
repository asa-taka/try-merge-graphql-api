module.exports = `

scalar DateTime

type Document {
  id: ID!
  title: String
  content: String
  authorId: ID!
  created: DateTime!
  updated: DateTime!
}

input DocumentInput {
  title: String!
  content: String!
  author: ID!
}

type Query {
  document(id: ID!): Document
  documents(authorId: ID): [Document!]!
}

type Mutation {
  createDocument(input: DocumentInput!): Document!
}

`
