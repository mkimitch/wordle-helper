import "./styles.scss";

import React, { FC } from "react";

import WordleHelper from "./components/WordleHelper";

const App: FC = () => {
	return (
		<div className="App">
			<WordleHelper />
		</div>
	);
};

export default App;
