import { useMutation } from "@tanstack/react-query";
import { userApi } from "./client";

export const useDeleteUser = () => {
	return useMutation({
		mutationFn: (id: string) => userApi.delete(id),
	});
};
