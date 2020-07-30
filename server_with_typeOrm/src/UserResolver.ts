import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";

import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { sendRefreshToken, createAccessToken } from "./configs/authTokens";
import { isAuth } from "./configs/isAuth";
import { getManager } from "typeorm";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  // GET USERS
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  testIsAuth(@Ctx() { payload }: MyContext) {
    console.log("UserResolver -> testIsAuth -> payload", payload);
    return `UserId ${payload!.userId} Authorized!`;
  }

  // // This .increment({ id: userId }, "tokenVersion", 1) is not supported in mongoDB with typeOrm
  // @Mutation(() => Boolean)
  // async revokeRefreshTokenForUser(@Arg("userId", () => String) userId: string) {
  //   console.log("revokeRefreshTokenForUser -> userId", userId);
  //   // const user = await User.findOne(userId);
  //   const user = await getManager()
  //     .getRepository(User)
  //     .increment({ id: userId }, "tokenVersion", 1);
  //   console.log("Updated!", user);
  //   return true;
  // }
  // SIGNUP
  @Mutation(() => Boolean)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const hashedPassword = await hash(password, 10);
      await User.insert({
        email,
        password: hashedPassword,
        tokenVersion: 0,
      });
      return true;
    } catch (err) {
      console.log("UserResolver -> signup -> err", err);
      return false;
    }
  }
  // LOGIN
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext // we can pas req as well...
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Could not find user");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password!");
    }

    // => login successful

    // set cookie
    sendRefreshToken(res, user);

    // send accessToken
    return {
      accessToken: createAccessToken(user),
    };
  }
}
