import React from "react";
import { Button } from "./ui/Button";
import { MIN_BOARD_LENGTH } from "../constants";
import { Modal } from "./ui/Modal";
import { validateNumberInput } from "../utils/validation-utils";
import { ErrorAlert } from "./ui/ErrorAlert";
import { useGameSession } from "../providers/game-session";

export function UserInput(): React.JSX.Element {
  const { startNewGame, gameId } = useGameSession();
  const [input, setLengthInput] = React.useState<string>(
    String(MIN_BOARD_LENGTH),
  );
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleSubmit = (_: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const sanitisedInput = validateNumberInput(input);
      setErrorMessage("");
      startNewGame(sanitisedInput);
    } catch (error) {
      setErrorMessage(
        "Invalid Input. Only valid numbers between 3 and 15 are allowed.",
      );
    }
  };

  return (
    <Modal isOpen={!gameId}>
      <h2>Let's play a new game</h2>
      <label htmlFor="board-size-input">
        Enter board size (the board length):
      </label>
      <input
        id="board-size-input"
        value={input}
        min={MIN_BOARD_LENGTH}
        onChange={(e) => {
          setLengthInput(e.target.value);
        }}
        className="p-2 rounded-md bg-text-secondary text-background-primary border-border-light focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errorMessage && ErrorAlert(errorMessage)}
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Start Game
      </Button>
    </Modal>
  );
}
