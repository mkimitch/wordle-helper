import React, { FC } from "react";
import { useGlobalStore } from "../../context/GlobalStore";
import "./Results.styles.scss";

const Results: FC = () => {
	const { globalStore } = useGlobalStore();

	return (
		<div className="results">
			{globalStore.results.length > 0 ? (
				<>
					<h2>Possible words ({globalStore.results.length}):</h2>
					<div className="possible-words">
						<ul id="results">
							{globalStore.results.map((word) => (
								<li key={word}>{word}</li>
							))}
						</ul>
					</div>
				</>
			) : (
				<p>No results found. Please enter valid letters.</p>
			)}
		</div>
	);
};

export default Results;
