import app from "../app";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { TodoResolvers } from "../resolvers/todoResolvers";
import { PostResolvers } from "../resolvers/postResolvers";
import { LaunchResolvers } from "../resolvers/launchResolvers";
import { UserResolver } from "../resolvers/userResolvers";

const PORT = process.env.PORT || 4400;
export const Auth_Server = async () => {
  // DB connection
  const db = await mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected! Database connection name: ${db.connections[0].name}`);

  // Apollo server connections
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LaunchResolvers, PostResolvers, TodoResolvers, UserResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  server.applyMiddleware({
    app,
    path: "/graphql",
  });
  // Connect apolloServer with app
  // apolloServer.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};
