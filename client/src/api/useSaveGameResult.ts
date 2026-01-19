import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	DRAW,
	type GameResult,
	type GameSettings,
} from "../components/game/types";
import type { Player } from "../components/players/types";
import { gameApi, userApi } from "./client";

const createUserIfNotExist = async (player: Player): Promise<void> => {
	const existing = await userApi.getById(player.id);
	if (!existing) {
		await userApi.create({ id: player.id, name: player.name });
	}
};

/**
 * Creates the players on the server if they don't yet exist,
 * then save the game info.
 */
const saveGameResult = async (
	params: GameSettings & { result: GameResult },
): Promise<void> => {
	await Promise.all([
		createUserIfNotExist(params.xPlayer),
		createUserIfNotExist(params.oPlayer),
	]);

	await gameApi.create({
		id: params.id,
		boardSize: params.boardSize,
		firstPlayer: params.firstPlayer,
		winner: params.result === DRAW ? null : params.result,
		isDraw: params.result === DRAW,
		userXId: params.xPlayer.id,
		userOId: params.oPlayer.id,
	});
};

export const useSaveGameResult = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: saveGameResult,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stats"] });
		},
	});
};
