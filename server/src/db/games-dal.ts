import { eq } from "drizzle-orm";
import db from "./client.js";
import { moves, games, type AddMoveRequest, type GameMove } from "./schema.js";
import { type GameRound } from "../types/api-types.js";

export async function insertGame(boardSideLength: number): Promise<GameRound> {
  const boardSize = boardSideLength * boardSideLength;
  const [newGame] = await db.insert(games).values({ boardSize }).returning();

  return newGame;
}
export async function updateGameWinner(
  gameId: string,
  gameWinner: "X" | "O" | "TIE",
): Promise<GameRound> {
  return await db
    .update(games)
    .set({
      winner: gameWinner,
      completedAt: new Date(),
      status: "COMPLETED",
    })
    .where(eq(games.id, gameId))
    .returning()
    .then(([updatedGame]) => {
      if (!updatedGame) {
        throw new Error(`Game with id ${gameId} not found`);
      }
      return updatedGame;
    });
}

export async function getAllGames(): Promise<GameRound[]> {
  return await db.select().from(games);
}

export async function insertGameMove(
  newMove: AddMoveRequest,
): Promise<GameMove> {
  return await db
    .insert(moves)
    .values(newMove)
    .returning()
    .then(([move]) => move);
}
