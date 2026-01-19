import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import type { Player } from "./types";

const STORAGE_KEY = "tic-tac-toe-players";
export const ANONYMOUS_NAME = "Anonymous";

const createPlayer = (name: string): Player => ({
	id: uuid(),
	name: name.trim(),
});

const loadPlayers = (): Player[] => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		const players: Player[] = stored ? JSON.parse(stored) : [];
		// Ensure Anonymous player always exists
		if (!players.some((p) => p.name === ANONYMOUS_NAME)) {
			return [createPlayer(ANONYMOUS_NAME), ...players];
		}
		return players;
	} catch {
		return [createPlayer(ANONYMOUS_NAME)];
	}
};

const savePlayers = (players: Player[]): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
};

export type UsePlayerStorage = {
	players: Player[];
	addPlayer: (name: string) => Player;
	removePlayer: (id: string) => void;
};

export const usePlayerStorage = (): UsePlayerStorage => {
	const [players, setPlayers] = useState<Player[]>(loadPlayers);

	useEffect(() => {
		savePlayers(players);
	}, [players]);

	const addPlayer = useCallback((name: string): Player => {
		const newPlayer = createPlayer(name);
		setPlayers((prev) => [...prev, newPlayer]);
		return newPlayer;
	}, []);

	const removePlayer = useCallback((id: string): void => {
		setPlayers((prev) => {
			const player = prev.find((p) => p.id === id);
			// Don't allow removing the Anonymous player
			if (player?.name === ANONYMOUS_NAME) return prev;
			return prev.filter((p) => p.id !== id);
		});
	}, []);

	return { players, addPlayer, removePlayer };
};
