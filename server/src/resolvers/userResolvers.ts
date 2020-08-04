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
import jwt from "jsonwebtoken";

import User, { UserFields } from "../entity/User.model";
import { MyContext } from "../configs/MyContext";
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../configs/authTokens";
import { isAuthenticated } from "../configs/isAuthenticated";

@ObjectType()
class SignupResponse {
  @Field()
  ok: boolean;
  @Field()
  message?: string;
}
@ObjectType()
class LoginResponse extends SignupResponse {
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
  @Query(() => UserFields, { nullable: true })
  @UseMiddleware(isAuthenticated)
  loggedUser(@Ctx() { payload }: MyContext) {
    return User.findById(payload?.userId);
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
  @Mutation(() => SignupResponse)
  async signup(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await User.findOne({ email });
    console.log("signup ");

    if (user) {
      return {
        ok: false,
        message: "This email already registered!",
      };
    }

    try {
      const hashedPassword = await hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
      });
      return {
        ok: true,
        message: "Signup successful!",
      };
    } catch (err) {
      console.log("UserResolver -> signup -> err", err);
      return {
        ok: false,
        message: err.message,
      };
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
      return {
        accessToken: "",
        ok: false,
        message: "This email is not registered!",
      };
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return {
        accessToken: "",
        ok: false,
        message: "Invalid password!",
      };
    }

    // => login successful
    // set cookie
    sendRefreshToken(res, createRefreshToken(user));

    // send accessToken
    return {
      accessToken: createAccessToken(user),
      ok: true,
      message: "Login successful!",
    };
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    return true;
  }
}
