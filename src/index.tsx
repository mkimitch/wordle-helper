import "./styles.scss";

import App from "./App";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
