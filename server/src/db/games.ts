import db from "./client.js";
import {
  gameRoundsTable,
  type NewGameRoundRequest,
  type GameRound,
} from "./schema.js";

export async function insertGameRound(
  gameRound: NewGameRoundRequest,
): Promise<GameRound> {
  const [newGame] = await db
    .insert(gameRoundsTable)
    .values(gameRound)
    .returning();

  return newGame;
}
