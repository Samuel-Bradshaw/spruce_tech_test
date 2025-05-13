export type XorO = "X" | "O";

export type BoardGrid = (XorO | undefined)[][];

export enum BoardState {
  InProgress = "inProgress",
  XWin = "Xwin",
  OWin = "Owin",
  Draw = "draw",
}

export type GameStats = {
  xwins: number;
  owins: number;
  draws: number;
};
