import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./assets/index";
import { Main } from "./main";

const queryClient = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: We own `index.html`, we know it has a root
const root = createRoot(document.getElementById("root")!);
root.render(
	<QueryClientProvider client={queryClient}>
		<Main />
	</QueryClientProvider>,
);
