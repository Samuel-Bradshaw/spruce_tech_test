import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Main } from "./main";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
