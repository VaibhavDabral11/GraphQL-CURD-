import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
const express = require('express');
const app = express();
const port = 4000;
const prisma = new PrismaClient();

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

const resolvers = {
    Query: {
        users: async (_, __, { prisma }) => {
            return await prisma.user.findMany();
        },
        user: async (_, { id }, { prisma }) => {
            return await prisma.user.findOne({
                where: {
                    id
                },
            });
        },
    },
    Mutation: {
        createUser: async (_, { name, email, password }, { prisma }) => {
            return await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                },
            });
        },
          updateUser: async (_, { name, email, password }, { prisma }) => {
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
            return await prisma.user.delete({
                where: {
                    id,
                },
            });
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    },
});

app.listen(port, async () => {
    await server.start();
    await server.applyMiddleware({ app });
    console.log(`Server is running on http://localhost:${port}/graphql`);
});