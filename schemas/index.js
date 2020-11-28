const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type AuthData {
        token: String!
        user: User!
    }

    type User {
        _id: ID!
        email: String!
        date: String!
        books: [Book!]
    }

    type Book {
        _id: ID!
        name: String!
        description: String!
        publishedAt: String!
        author: User!
    }

    input AuthInput {
        email: String!
        password: String!
    }

    input BookInput {
        name: String!
        description: String!
    }

    type RootQuery {
        books: [Book!]!
        book(id: String!): Book!
        getAuthenticatedUser: User!
    }

    type RootMutation {
        createBook(bookInput: BookInput): Book
        updateBook(bookInput: BookInput): Book
        removeBook(id: String): String
        createUser(authInput: AuthInput): AuthData
        authenticateUser(authInput: AuthInput): AuthData
        removeUser(): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
