import { MAX_BOARD_LENGTH, MIN_BOARD_LENGTH } from "../constants";
import { toInteger } from "lodash";

export function validateNumberInput(lengthStr: string): number {
  const lengthNum = toInteger(lengthStr);
  if (
    isNaN(lengthNum) ||
    lengthNum < MIN_BOARD_LENGTH ||
    lengthNum > MAX_BOARD_LENGTH
  ) {
    throw new Error(
      "Invalid Input. Only numbers between 3 and 15 are allowed.",
    );
  }
  return lengthNum;
}
