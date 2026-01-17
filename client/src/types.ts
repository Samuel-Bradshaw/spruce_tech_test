export type XorO = 'X' | 'O';
/**
 * The state of the board as an immutable 1-D array.
 */
export type BoardState = readonly (XorO | undefined)[];