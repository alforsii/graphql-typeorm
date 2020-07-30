import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "src/entity/User";

// jwt.sign(payload, secretOrPrivateKey, [options, callback])

export const createAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, user: User) => {
  return res.cookie("ashash", createRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
};
