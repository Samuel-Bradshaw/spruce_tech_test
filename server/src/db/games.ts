import db from "./client.js";
import { gameRoundsTable, type GameRound } from "./schema.js";

export async function insertGameRound(
  boardSideLength: number,
): Promise<GameRound> {
  const boardSize = boardSideLength * boardSideLength;
  const [newGame] = await db
    .insert(gameRoundsTable)
    .values({ boardSize })
    .returning();

  return newGame;
}
