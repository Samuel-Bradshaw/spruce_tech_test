import React from "react";
import { Button } from "./ui/Button";
import { DEFAULT_BOARD_LENGTH } from "../constants";

export function UserInput({
  setBoardLength,
}: {
  setBoardLength: React.Dispatch<React.SetStateAction<number | undefined>>;
}): React.JSX.Element {
  const [lengthInput, setLengthInput] = React.useState<string>(
    String(DEFAULT_BOARD_LENGTH),
  );

  const handleSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    setBoardLength(sanitiseNumberInput(lengthInput));
  };

  return (
    <>
      <h2>Let's play a new game</h2>
      <label htmlFor="board-size-input">
        Enter board size (the board length):
      </label>
      <input
        id="board-size-input"
        type="number"
        onChange={(e) => setLengthInput(e.target.value)}
        value={lengthInput}
        min={DEFAULT_BOARD_LENGTH}
      />
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Start Game
      </Button>
    </>
  );
}

function sanitiseNumberInput(lengthStr: string): number {
  const lengthNum = Number(lengthStr);
  if (isNaN(lengthNum) || lengthNum < DEFAULT_BOARD_LENGTH) {
    throw new Error("Invalid Input. Only numbers >= 3 are allowed.");
  }
  return lengthNum;
}
