import { useQuery } from "@tanstack/react-query";
import { statsApi } from "./client";

export const useStats = () => {
	return useQuery({
		queryKey: ["stats"],
		queryFn: statsApi.get,
	});
};
