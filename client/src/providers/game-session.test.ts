import { act, renderHook } from "@testing-library/react";
import { GameSessionProvider, useGameSession } from "./game-session";

describe("useGameSession", () => {
  beforeEach(() => jest.clearAllMocks());

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

    act(() => {
      result.current.startNewGame(5);
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

  it("should toggle state change if game is started", () => {
    const { result } = renderHook(() => useGameSession(), {
      wrapper: GameSessionProvider,
    });

    act(() => {
      result.current.startNewGame(5);
      result.current.makeGameMove(3);
    });

    expect(result.current.activePlayer).toBe("O");
    expect(result.current.board?.length).toEqual(25);
    expect(result.current.board?.[3]).toBe("X");
  });
});
