import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import ThemeContextProvider from "./contexts/ThemeContextProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</BrowserRouter>
	</StrictMode>
);
