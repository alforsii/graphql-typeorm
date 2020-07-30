import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import { UserResolver } from "./UserResolver";
import { User } from "./entity/User";
import { createAccessToken, sendRefreshToken } from "./configs/authTokens";

const PORT = process.env.PORT || 4400;
const dbName = require("../ormconfig.json").database;

(async () => {
  const app = express();
  // set cookie parser before routes
  app.use(cookieParser());

  // routes
  app.post("/refresh_token", async (req, res) => {
    // res.send(req.headers);
    // res.send(req.cookies); // { "key": "value"}

    const token = req.cookies.tokenName;

    if (!token) {
      return res.send({
        ok: false,
        accessToken: "",
      });
    }

    let payload: any = null;
    console.log("token", token);
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
      console.log("payload", payload);
    } catch (err) {
      console.log(err);
      return res.send({
        ok: false,
        accessToken: "",
      });
    }

    // get current user
    // 1. to findOne by id didn't work for me  // // =========
    // I guess because of mongo id is ObjectID - so probably need to convert before search
    // const user = await User.findOne({ id: payload.userId });

    // 2.so I had to get all users from DB and then get user by id using filter
    const users = await User.find();
    console.log("users", users);
    const user = users.filter((user) => user.id == payload.userId)[0];
    console.log("user", user);

    if (!user) {
      return res.send({
        ok: false,
        accessToken: "",
      });
    }

    // check for tokenVersion validation
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({
        ok: false,
        accessToken: "",
      });
    }
    // re set new refreshToken
    sendRefreshToken(res, user);
    // send valid token
    return res.send({
      ok: true,
      accessToken: createAccessToken(user),
    });
  });

  // DB connection(It's set to mongodb in ormconfig file)
  await createConnection();
  console.log(`Connected! Database connection name: ${dbName}`);

  // Create Apollo Server connection
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
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
