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

import User, { UserFields } from "../entity/User.model";
import { MyContext } from "../configs/MyContext";
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../configs/authTokens";
import { isAuthenticated } from "../configs/isAuthenticated";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  // GET USERS
  @Query(() => [UserFields])
  users() {
    return User.find();
  }

  @Query(() => String)
  @UseMiddleware(isAuthenticated)
  testIsAuth(@Ctx() { payload }: MyContext) {
    return `UserId ${payload!.userId} Authorized!`;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg("userId", () => String) userId: string) {
    const user = await User.findByIdAndUpdate(userId, {
      $inc: { tokenVersion: 1 },
    });
    console.log("Updated!", user);
    return true;
  }
  // SIGNUP
  @Mutation(() => Boolean)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    try {
      const hashedPassword = await hash(password, 10);
      await User.create({
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
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Could not find user");
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password!");
    }

    // => login successful
    // set cookie
    sendRefreshToken(res, createRefreshToken(user));

    // send accessToken
    return {
      accessToken: createAccessToken(user),
    };
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }
}
