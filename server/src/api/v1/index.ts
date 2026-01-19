import { Hono } from "hono";
import gameRoute from "./game/game.route";
import statsRoute from "./stats/stats.route";
import userRoute from "./user/user.route";

const v1Routes = new Hono();

v1Routes.route("/game", gameRoute);
v1Routes.route("/stats", statsRoute);
v1Routes.route("/user", userRoute);

export default v1Routes;
