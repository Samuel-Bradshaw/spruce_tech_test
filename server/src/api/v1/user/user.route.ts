import { Hono } from "hono";

const userRoute = new Hono();

userRoute.get("/", (c) => c.json({ users: [] }));

export default userRoute;
