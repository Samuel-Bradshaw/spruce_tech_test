import { env } from "@server/config/env";
import { type AppType } from "@server/index";
import { hc } from "hono/client";

const API_BASE_URL = env.API_BASE_URL;

const honoClient = hc<AppType>(API_BASE_URL);
export type HonoClient = typeof honoClient;

export default honoClient;
