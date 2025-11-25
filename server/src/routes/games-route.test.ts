import { serve, type ServerType } from "@hono/node-server";
import { hc } from "hono/client";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import * as gamesDb from "../db/games-dal.js";
import { setupServer } from "../utils/server-utils.js";
import gamesRouter from "./games-route.js";
import { gameSchema } from "../types/zod-schema.js";
import {
  createMockGameMove,
  createMockGameRound,
  createMockGameStats,
} from "../utils/test-utils/db-mocks.js";

vi.mock("../db/games-dal.js", () => ({
  insertGame: vi.fn(),
  updateGameWinner: vi.fn(),
  getAllGames: vi.fn(),
  insertGameMove: vi.fn(),
}));

describe("Games Resource", () => {
  const testApp = setupServer({
    "/": gamesRouter,
  });

  const client = hc<typeof testApp>(`http://localhost:9001`);

  let server: ServerType | undefined;
  beforeAll(async () => {
    server = serve(
      {
        fetch: testApp.fetch,
        port: 9001,
      },
      () => {},
    );
    // Wait to ensure server is ready
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  afterAll(() => {
    server?.close();
  });

  it("returns a new game on creation", async () => {
    const mockGameRound = createMockGameRound({ boardSize: 49 });
    vi.mocked(gamesDb.insertGame).mockResolvedValue(mockGameRound);

    const res = await client.index.$post({
      json: { boardSideLength: 7 },
    });

    expect(gamesDb.insertGame).toHaveBeenCalledWith(7);

    expect(res.status).toBe(201);
    const result = gameSchema.parse(await res.json());
    expect(result.boardSize).toBe(49); // 7x7 board should have 49 cells
    expect(result.status).toEqual("IN_PROGRESS");
    expect(result.winner).toBeNull();
  });

  it("updates a new game with a winner", async () => {
    const mockUpdatedRound = createMockGameRound({
      winner: "X",
      status: "COMPLETED",
      completedAt: new Date(),
    });
    vi.mocked(gamesDb.updateGameWinner).mockResolvedValue(mockUpdatedRound);

    const res = await client.winner.$put({
      json: { winner: "X", gameId: mockUpdatedRound.id },
    });

    expect(gamesDb.updateGameWinner).toHaveBeenCalledWith(
      mockUpdatedRound.id,
      "X",
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    const result = gameSchema.parse(body);
    expect(result.winner).toBe("X");
    expect(result.status).toBe("COMPLETED");
  });

  it("returns game stats for all games", async () => {
    const expectedResult = createMockGameStats({
      totalGames: 3,
      playerOWins: 1,
      playerXWins: 2,
      totalDraws: 0,
    });

    const mockRounds = [
      createMockGameRound({ winner: "X", status: "COMPLETED" }),
      createMockGameRound({ winner: "O", status: "COMPLETED" }),
      createMockGameRound({ winner: "X", status: "COMPLETED" }),
    ];
    vi.mocked(gamesDb.getAllGames).mockResolvedValue(mockRounds);

    const res = await client.stats.$get();
    const stats = await res.json();

    expect(res.status).toBe(200);
    expect(stats).toEqual(expectedResult);
  });

  it("it returns an inserted move for a specific game", async () => {
    const mockMove = createMockGameMove({
      boardState: ["X", null, null, null, null, null, null, null, null],
    });
    vi.mocked(gamesDb.insertGameMove).mockResolvedValue(mockMove);

    const res = await client[":gameId"].move.$post({
      json: { player: "X", positionPlayed: 0, board: Array(9).fill(null) },
      param: { gameId: "test-game-id" },
    });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ boardState: mockMove.boardState });
  });
});
