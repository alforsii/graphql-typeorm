import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "src/entity/User.model";

// jwt.sign(payload, secretOrPrivateKey, [options, callback])

export const createAccessToken = (user: IUser) => {
  const accToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
  return accToken;
};

export const createRefreshToken = (user: IUser) => {
  const refToken = jwt.sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
  return refToken;
};

export const sendRefreshToken = (res: Response, user: IUser) => {
  return res.cookie("ashash", createRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
  });
};
