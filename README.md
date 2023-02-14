# CURD Operation Using GraphQL API

# Graphql

GraphQL is a query language and runtime that enables clients to specify the data they need from an API, and the server to respond with exactly that data. It was developed by  facebook in 2012 and was publicly released in 2015 and is commonly used to build APIs for web and mobile applications.

## Server in graphql 

[GraphQl Inbuild Server](https://github.com/VaibhavDabral11/GraphQLAPI) 
<Br>
[GraphQl with Apollo Server](https://github.com/VaibhavDabral11/GraphQL-CURD-)

## Typedefs,Resolve and Schema in graphql

In GraphQL, typedefs, resolvers, and schema are important concepts that define the structure and behavior of a GraphQL API. Here's a brief explanation of each:

1. TypeDefs (Type Definitions):
TypeDefs are the definition of the GraphQL types that you want to use in your schema. It defines the types, queries, and mutations that can be used in your API. For example, you might define a `User` type, a `Query` type, and a `Mutation` type in your typedefs to represent the data and operations available in your API. For example: 

```
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
```
2. Resolvers:
Resolvers are functions that are responsible for returning data for a specific field in your schema. Each field in your schema has a corresponding resolver function that defines how to fetch or manipulate the data for that field. Resolvers receive input from the client and use that input to fetch data from a database, an external API, or some other source. Resolvers return the actual data that is sent back to the client. for example 

```
// define the resolvers for the queries and mutations
const resolvers = {
    Query: {//=>Queries are used to fetch data (request to retrieve the data from the server )
        users: async (_, __, { prisma }) => {
            // retrieve all users from the database using the Prisma Client
            return await prisma.user.findMany();
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
};
```

3. Schema:
The schema is the main component that ties everything together in a GraphQL API. It defines the types that are available in the API, the fields and arguments that can be queried, and the operations that can be performed on the data. The schema is created by combining the typedefs and resolvers into a single executable schema, which can then be used to run queries and mutations.For example.

```
model User {
    id Int @id @default(autoincrement())
    name    String   @db.VarChar(255) @unique
    email   String    @db.VarChar(255) @unique
    password    String  @db.VarChar(255) @unique
}
```

In summary, type definitions (typedefs) define the structure of the API, resolvers define the behavior of the API, and the schema ties everything together to create a fully functional API.

## Query and mutation in Graphql

In GraphQL, queries and mutations are two different types of operations that can be performed on a GraphQL API.

1. Query:
A query is a read-only operation that retrieves data from the server. In a query, clients specify the fields they want to retrieve, and the server returns only the requested fields in the response. Queries are defined in the `Query` type in the GraphQL schema, and they are executed using a special `query` operation in the GraphQL API.

2. A mutation is a write operation that modifies data on the server. In a mutation, clients specify the data they want to change, and the server updates the data accordingly. Mutations are defined in the `Mutation` type in the GraphQL schema, and they are executed using a special `mutation` operation in the GraphQL API. 

Set up the development environment:

1.Install the latest version of Node.js and npm.

2. Install the Prisma CLI by running the following command:
```
npm install -g prisma
```

3.Initialize a new project:

Create a new directory for your project and navigate into it.
Run the following command to initialize a new Prisma project:
```
prisma init
```
Select the Demo server option.

4. Choose the MySQL database.

Define the data model:
Open the prisma/schema.prisma file.
Define the data model for your application, for example:
```type User {
    id: ID! @id
    name: String!
    email: String!
    password: String!
}
```

5. Create the first migration:

```
 prisma migrate dev --name init
```

6. Install the necessary packages:

```
npm install express graphql apollo-server-express
```
## For theory details follow this repo :- [GraphQL Theory ](https://github.com/VaibhavDabral11/GraphQLAPI) 
