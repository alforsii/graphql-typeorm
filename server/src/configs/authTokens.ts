import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "src/entity/User";

// jwt.sign(payload, secretOrPrivateKey, [options, callback])

export const createAccessToken = (user: IUser) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: IUser) => {
  return jwt.sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res: Response, user: IUser) => {
  return res.cookie("ashash", createRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
};
