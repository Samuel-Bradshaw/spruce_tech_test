import { AppType } from "@server/index";
import { boardSchema, gameSchema } from "@server/types/zod-schema";
import { hc } from "hono/client";
import { CellState, GameRound, XorO } from "src/types";
import z from "zod";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

const honoClient = hc<AppType>(API_BASE_URL);
export type HonoClient = typeof honoClient;

export default honoClient;

export async function startGame(boardSideLength: number): Promise<GameRound> {
  try {
    const response = await honoClient.api.v1.games.$post({
      json: { boardSideLength },
    });

    const data = await response.json();
    return gameSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid game data received from server. Error: ${error.message}`,
      );
    }
    throw new Error("Failed to start a new game");
  }
}

export async function makeMove(
  gameId: string,
  player: XorO,
  cellIdx: number,
  board: CellState[],
): Promise<CellState[]> {
  try {
    const response = await honoClient.api.v1.games[":gameId"].move.$post({
      param: { gameId },
      json: { player, positionPlayed: cellIdx, board },
    });

    const data = await response.json();
    return boardSchema.parse(data).boardState.map((cell) => cell ?? undefined);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid game data received from server. Error: ${error.message}`,
      );
    }
    throw new Error("Failed to start a new game");
  }
}
