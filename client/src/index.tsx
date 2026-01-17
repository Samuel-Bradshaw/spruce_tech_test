import { createRoot } from "react-dom/client";
import "./assets/index";
import { Main } from "./main";

// biome-ignore lint/style/noNonNullAssertion: We own `index.html`, we know it has a root
const root = createRoot(document.getElementById("root")!);
root.render(<Main />);
