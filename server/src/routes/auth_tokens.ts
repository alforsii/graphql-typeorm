import express from "express";
import jwt from "jsonwebtoken";
import User from "../entity/User.model";
import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "../configs/authTokens";

const route = express.Router();

route.post("/refresh_token", async (req, res) => {
  // res.send(req.headers);
  // res.send(req.cookies); // { "key": "value"}
  const token = req.cookies.ashash;

  if (!token) {
    return res.send({
      ok: false,
      accessToken: "",
    });
  }

  let payload: any = null;

  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({
      ok: false,
      accessToken: "",
    });
  }

  // get current user
  const user = await User.findById({ _id: payload.userId });

  if (!user) {
    return res.send({
      ok: false,
      accessToken: "",
    });
  }

  // check for tokenVersion validation
  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({
      ok: false,
      accessToken: "",
    });
  }
  // re set new refreshToken
  sendRefreshToken(res, createRefreshToken(user));
  // send valid token
  return res.send({
    ok: true,
    accessToken: createAccessToken(user),
  });
});

export default route;
