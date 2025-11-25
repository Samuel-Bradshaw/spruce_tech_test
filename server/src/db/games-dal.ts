import { eq } from "drizzle-orm";
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
export async function updateGameWinner(
  gameId: string,
  updateGameWinner: "X" | "O" | "TIE",
): Promise<GameRound> {
  return db
    .update(gameRoundsTable)
    .set({
      winner: updateGameWinner,
      completedAt: new Date(),
      status: "COMPLETED",
    })
    .where(eq(gameRoundsTable.id, gameId))
    .returning()
    .then(([updatedGame]) => {
      if (!updatedGame) {
        throw new Error(`Game with id ${gameId} not found`);
      }
      return updatedGame;
    });
}
