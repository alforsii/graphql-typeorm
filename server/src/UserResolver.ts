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
import { createRefreshToken, createAccessToken } from "./configs/authTokens";
import { isAuth } from "./configs/isAuth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

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

  // SIGNUP
  @Mutation(() => Boolean)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const hashedPassword = await hash(password, 10);
      await User.insert({
        email,
        password: hashedPassword,
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
    res.cookie("ashash", createRefreshToken(user), { httpOnly: true });

    // send accessToken
    return {
      accessToken: createAccessToken(user),
    };
  }
}
