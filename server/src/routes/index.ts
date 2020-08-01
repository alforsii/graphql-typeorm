import { Router } from "express";
const route = Router();

route.get("/", (req, res) => {
  res.send("Hello Test");
});

export default route;
