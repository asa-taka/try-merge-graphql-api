const { mergeTypes } = require('merge-graphql-schemas')

const docTypes = require('../document/typeDefs')
const userTypes = require('../user/typeDefs')

const types = [
  docTypes,
  userTypes,
]

module.exports = mergeTypes(types)
console.log(module.exports)
