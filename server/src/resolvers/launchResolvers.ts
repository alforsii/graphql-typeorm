import { Resolver, Query, Arg, ObjectType, Field, Int } from "type-graphql";
import axios from "axios";

@ObjectType()
class LaunchFields {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => Int)
  flight_number: number;
  @Field()
  launch_year: string;
  @Field()
  mission_name: string;
  @Field()
  launch_date_local: string;
  @Field(() => Boolean, { nullable: true })
  success?: boolean;
  @Field(() => String, { nullable: true })
  details?: string;
}

@Resolver()
export class LaunchResolvers {
  @Query(() => String)
  helloLaunch() {
    return "Hello launch";
  }

  @Query(() => [LaunchFields])
  async launches() {
    return await (await axios.get("https://api.spacexdata.com/v3/launches"))
      .data;
  }
  @Query(() => LaunchFields)
  async launch(@Arg("flight_number") flight_number: number) {
    return (
      await axios.get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
    ).data;
  }
  @Query(() => LaunchFields)
  async nextLaunch() {
    return (await axios.get(`https://api.spacexdata.com/v3/launches/next`))
      .data;
  }
}
