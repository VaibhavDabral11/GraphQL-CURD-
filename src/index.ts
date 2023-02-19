import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
const express = require('express');
const app = express();
const port = 4000;

// create a new instance of the Prisma Client
const prisma = new PrismaClient();

// define the GraphQL schema (types, queries and mutations)
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
        updateUser(id: ID!, name: String, email: String, password: String): User
        deleteUser(id: ID!): User
    }
`;

// define the resolvers for the queries and mutations
const resolvers = {
    Query: {//=>Queries are used to fetch data (request to retrieve the data from the server )
        users: async (_, __, { prisma }) => {
            // retrieve all users from the database using the Prisma Client
            return await prisma.user.findMany();
        },
        user: async (_, { id }, { prisma }) => {
            // retrieve a single user by its id from the database using the Prisma Client
            return await prisma.user.findUnique({
                where: {
                    id
                },
            });
        },
    },
    Mutation: {//=>Mutations are used to create, update, or delete data ( request to modify data on the server)
        createUser: async (_, { name, email, password }, { prisma }) => {
            // create a new user in the database using the Prisma Client
            return await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
        },
          updateUser: async (_, { name, email, password }, { prisma }) => {
            // update a user in the database using the Prisma Client
            return await prisma.user.update({
                where: {
                    email
                },
                data: {
                    name,
                    password,
                },
            });
        },
        deleteUser: async (_, { id }, { prisma }) => {
            // delete a user from the database using the Prisma Client
            return await prisma.user.delete({
                where: {
                    id,
                },
            });
        },
    },
};

// create an instance of the ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // make the Prisma Client available in the resolvers
    context: {
        prisma,
    },
});

// start the Express server and apply the ApolloServer middleware
app.listen(port, async () => {
    await server.start();
    await server.applyMiddleware({ app });
    console.log(`Server is running on http://localhost:${port}/graphql`);
});
