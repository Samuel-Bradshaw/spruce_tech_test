import React from "react";
import { Button } from "./ui/Button";
import { MIN_BOARD_LENGTH } from "../constants";
import { Modal } from "./ui/Modal";
import { sanitiseNumberInput } from "../utils/sanitation-utils";

type UserInputProps = {
  setBoardLength: React.Dispatch<React.SetStateAction<number | undefined>>;
  isOpen: boolean;
};

export function UserInput({
  setBoardLength,
  isOpen,
}: UserInputProps): React.JSX.Element {
  const [lengthInput, setLengthInput] = React.useState<string>(
    String(MIN_BOARD_LENGTH),
  );

  const handleSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const sanitisedInput = sanitiseNumberInput(lengthInput);
      setBoardLength(sanitisedInput);
    } catch (error) {
      console.log("ERROR: need warning");
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <h2>Let's play a new game</h2>
      <label htmlFor="board-size-input">
        Enter board size (the board length):
      </label>
      <input
        id="board-size-input"
        value={lengthInput}
        min={MIN_BOARD_LENGTH}
        onChange={(e) => {
          setLengthInput(e.target.value);
        }}
        className="p-2 rounded-md bg-text-secondary text-background-primary border-border-light focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Start Game
      </Button>
    </Modal>
  );
}
