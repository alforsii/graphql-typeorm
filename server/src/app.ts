import "dotenv/config";
import "reflect-metadata";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import indexRoutes from "./routes/index";
import authToken from "./routes/auth_tokens";
import { TodoResolvers } from "./schema/todoResolvers";
import { PostResolvers } from "./schema/postResolvers";
import { LaunchResolvers } from "./schema/launchResolvers";
import { UserResolver } from "./schema/userResolvers";

const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
const PORT = process.env.PORT || 4400;
(async () => {
  // set cookie parser before routes
  app.use(cookieParser());
  // DB connection(It's set to mongodb in ormconfig file)
  const db = await mongoose.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected! Database connection name: ${db.connections[0].name}`);

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LaunchResolvers, PostResolvers, TodoResolvers, UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // routes
  app.use("/", indexRoutes);
  app.use("/", authToken);

  server.applyMiddleware({ app, path: "/graphql" });
  // Connect apolloServer with app
  // apolloServer.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
})();

export default app;
