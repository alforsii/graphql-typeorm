import "reflect-metadata";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import * as express from "express";
import { UserResolver } from "./UserResolver";

config();
const app = express();
const PORT = process.env.PORT || 4400;
const dbName = require("../ormconfig.json").database;

(async () => {
  // DB connection(It's set to mongodb in ormconfig file)
  await createConnection();
  console.log(`Connected! Database connection name: ${dbName}`);

  // Create Apollo Server connection
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    // typeDefs: `
    //   type Query {
    //       hello: String!
    //   }
    //   `,
    // resolvers: {
    //   Query: {
    //     hello: () => "Hello from Apollo Server!",
    //   },
    // },
  });

  // Connect apolloServer with app
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();

// createConnection()
//   .then(async (connection) => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
