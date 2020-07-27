import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "./entity/User";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

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
}
