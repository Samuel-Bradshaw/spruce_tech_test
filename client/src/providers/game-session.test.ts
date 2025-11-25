import { act, renderHook } from "@testing-library/react";
import { GameSessionProvider, useGameSession } from "./game-session";

describe("useGameSession", () => {
  beforeEach(() => jest.clearAllMocks());

  it("initializes with null game and no loading/error state", () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    expect(result.current.activePlayer).toBe("X");
    expect(result.current.board).toEqual(Array(9).fill(undefined));
  });

  it("starts a new game successfully", async () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    act(() => {
      result.current.startNewGame(5);
    });

    expect(result.current.activePlayer).toBe("X");
    expect(result.current.boardLength).toBe(5);
    expect(result.current.board).toEqual(Array(25).fill(undefined));
  });

  it("toggles correct state change after a move", () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    act(() => {
      result.current.makeGameMove(3);
    });

    expect(result.current.board[3]).toBe("X");
    expect(result.current.activePlayer).toBe("O");
    const emptyCellsCount = result.current.board.filter(
      (cell) => cell !== undefined,
    ).length;
    expect(emptyCellsCount).toBe(1);
  });
});
