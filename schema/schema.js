const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const bookList = [
  { id: '1', name: 'The Last Ride', description: 'It is book one' },
  { id: '2', name: 'Night Owl', description: 'It is book two' },
  { id: '3', name: 'My Fantasy', description: 'It is book three' },
  { id: '4', name: 'King Of Paradise', description: 'It is book four' },
  { id: '5', name: 'The Lone Wolf', description: 'It is book five' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        return bookList.find((book) => book.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
