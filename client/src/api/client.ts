import axios from "axios";
import type { v1 } from "tic-tac-toe-server";

const API_BASE = "http://localhost:3000/api/v1";

const api = axios.create({
	baseURL: API_BASE,
});

export const userApi = {
	create: async (
		user: v1.CreateUserRequest,
	): Promise<v1.CreateUserResponse> => {
		const response = await api.post<v1.CreateUserResponse>("/user", user);
		return response.data;
	},

	getById: async (id: string): Promise<v1.GetUserResponse | null> => {
		try {
			const response = await api.get<v1.GetUserResponse>(`/user/${id}`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return null;
			}
			throw error;
		}
	},

	delete: async (id: string): Promise<void> => {
		try {
			await api.delete<v1.DeleteUserResponse>(`/user/${id}`);
		} catch (error) {
			// If user doesn't exist on server, that's fine - we still want to delete locally
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return;
			}
			throw error;
		}
	},
};

export const gameApi = {
	create: async (
		game: v1.CreateGameRequest,
	): Promise<v1.CreateGameResponse> => {
		const response = await api.post<v1.CreateGameResponse>("/game", game);
		return response.data;
	},
};
