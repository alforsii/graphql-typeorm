import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

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
    @Arg("password") password: string
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

    return {
      accessToken: sign({ userId: user.id }, "kshdkljhsdlk", {
        expiresIn: "15min",
      }),
    };
  }
}
