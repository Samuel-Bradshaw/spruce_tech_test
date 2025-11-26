import { act, renderHook, waitFor } from "@testing-library/react";
import * as honoClient from "../services/hono-client";
import {
  mockCompletedGame,
  mockGameMove,
  mockNewGame,
} from "../utils/test-mocks";
import { GameSessionProvider } from "../providers/game-session";
import { useGameSession } from "./useGameSession";

jest.mock("../services/hono-client", () => ({
  __esModule: true,
  default: {},
  startGame: jest.fn(),
  makeMove: jest.fn(),
  declareWinner: jest.fn(),
}));

describe("useGameSession", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (honoClient.startGame as jest.Mock).mockImplementation(mockNewGame);
    (honoClient.makeMove as jest.Mock).mockImplementation(mockGameMove());
    (honoClient.declareWinner as jest.Mock).mockResolvedValue(
      mockCompletedGame(),
    );
  });

  it("initializes with null game and no loading/error state", () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    expect(result.current.activePlayer).toBe("X");
    expect(result.current.board).toBeUndefined();
  });

  it("starts a new game successfully", async () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    await act(async () => {
      await result.current.startNewGame(5);
    });

    expect(result.current.activePlayer).toBe("X");
    expect(result.current.boardLength).toBe(5);
    expect(result.current.board).toEqual(Array(25).fill(undefined));
  });

  it("should not toggle state change if board is empty", () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    act(() => {
      result.current.makeGameMove(3);
    });

    expect(result.current.activePlayer).toBe("X");
    expect(result.current.board).toBeUndefined();
  });

  it("should toggle state change if game is started", async () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    await act(async () => {
      await result.current.startNewGame(5);
    });

    await act(async () => {
      await result.current.makeGameMove(3);
    });

    await waitFor(() => {
      expect(result.current.activePlayer).toBe("O");
      expect(result.current.board?.length).toEqual(25);
      expect(result.current.board?.[3]).toBe("X");
    });
  });
});
