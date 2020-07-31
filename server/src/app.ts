import "dotenv/config";
import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { TodoResolvers } from "./schema/todoResolvers";
import { PostResolvers } from "./schema/postResolvers";
import { LaunchResolvers } from "./schema/launchResolvers";

const PORT = process.env.PORT || 4400;

(async () => {
  const app = express();

  // DB connection(It's set to mongodb in ormconfig file)
  const db = await mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected! Database connection name: ${db.connections[0].name}`);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LaunchResolvers, PostResolvers, TodoResolvers],
    }),
  });

  server.applyMiddleware({ app, path: "/graphql" });
  // Connect apolloServer with app
  // apolloServer.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();
