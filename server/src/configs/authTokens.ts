import { User } from "../entity/User";
import jwt from "jsonwebtoken";

// jwt.sign(payload, secretOrPrivateKey, [options, callback])

export const createAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
