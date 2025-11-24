import db from "./client.js";
import {
  gameRoundsTable,
  type NewGameRoundRequest,
  type GameRound,
} from "./schema.js";

export async function insertGameRound(boardSize: number): Promise<GameRound> {
  const [newGame] = await db
    .insert(gameRoundsTable)
    .values({
      boardSize,
    })
    .returning();

  return newGame;
}
