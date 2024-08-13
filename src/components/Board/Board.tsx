import React, { FC, useEffect } from "react";
import Tile from "../Tile/Tile";
import { useGlobalStore } from "../../context/GlobalStore";
import "./Board.styles.scss";

const Board: FC = () => {
	const { globalStore, setGlobalStore } = useGlobalStore();

	// Handle key events
	const handleKeyDown = (e: KeyboardEvent) => {
		const key = e.key.toUpperCase();

		if (key === "BACKSPACE") {
			handleBackspace();
		} else if (key >= "A" && key <= "Z" && key.length === 1) {
			handleLetterInput(key);
		}
	};

	const handleLetterInput = (letter: string) => {
		// Find the first empty tile and fill it with the letter
		for (let row = 1; row <= 6; row++) {
			for (let col = 1; col <= 5; col++) {
				const tileKey = `${row}-${col}`;
				const tile = globalStore.boardState[tileKey] || {
					state: "",
					value: "",
				};

				if (!tile.value) {
					setGlobalStore((prevState) => ({
						...prevState,
						boardState: {
							...prevState.boardState,
							[tileKey]: {
								...tile,
								value: letter,
								state: "absent", // Default to "absent" state when a letter is entered
							},
						},
					}));
					return; // Exit after filling the first empty tile
				}
			}
		}
	};

	const handleBackspace = () => {
		// Find the last filled tile and remove its value and state
		for (let row = 6; row >= 1; row--) {
			for (let col = 5; col >= 1; col--) {
				const tileKey = `${row}-${col}`;
				const tile = globalStore.boardState[tileKey] || {
					state: "",
					value: "",
				};

				if (tile.value) {
					setGlobalStore((prevState) => ({
						...prevState,
						boardState: {
							...prevState.boardState,
							[tileKey]: {
								...tile,
								value: "",
								state: "", // Remove state when value is removed
							},
						},
					}));
					return; // Exit after clearing the last filled tile
				}
			}
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [globalStore.boardState]);

	return (
		<div className="board">
			{[...Array(6)].map((_, row) => (
				<div key={row} className="row">
					{[...Array(5)].map((_, col) => (
						<Tile key={col} row={row + 1} col={col + 1} />
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
