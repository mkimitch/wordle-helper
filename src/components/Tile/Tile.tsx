import "./Tile.styles.scss";

import React, { FC, useState, useEffect } from "react";
import type { TileProps } from "./Tile.types";
import { useGlobalStore } from "../../context/GlobalStore";

const Tile: FC<TileProps> = ({ row, col }) => {
	const { globalStore, setGlobalStore } = useGlobalStore();
	const tileKey = `${row}-${col}`;

	// Provide a default object to avoid undefined errors
	const tile = globalStore.boardState[tileKey] || { state: "", value: "" };
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!isFocused) return;

			if (e.key === "Backspace") {
				// Clear the tile value and state
				setGlobalStore((prevState) => ({
					...prevState,
					boardState: {
						...prevState.boardState,
						[tileKey]: {
							...tile,
							value: "",
							state: "",
						},
					},
				}));
			} else if (/^[a-zA-Z]$/.test(e.key)) {
				// Set the tile value to the typed letter
				const value = e.key.toUpperCase();
				setGlobalStore((prevState) => ({
					...prevState,
					boardState: {
						...prevState.boardState,
						[tileKey]: {
							...tile,
							value,
							state: tile.state || "absent", // Default state if not set
						},
					},
				}));
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isFocused, setGlobalStore, tile, tileKey]);

	const cycleTileState = () => {
		if (!tile.value) return; // Prevent state toggle if no letter is entered

		let newState: "absent" | "present" | "correct";
		switch (tile.state) {
			case "correct":
				newState = "present";
				break;
			case "present":
				newState = "absent";
				break;
			default:
				newState = "correct";
				break;
		}

		setGlobalStore((prevState) => ({
			...prevState,
			boardState: {
				...prevState.boardState,
				[tileKey]: {
					...tile,
					state: newState,
				},
			},
		}));
	};

	const handleClick = () => {
		setIsFocused(true);
		cycleTileState();
	};

	return (
		<div
			className={`tile ${tile.state} ${isFocused ? "focused" : ""}`}
			onClick={handleClick}
			style={{ backgroundColor: getTileColor(tile.state) }}
		>
			{tile.value}
		</div>
	);
};

const getTileColor = (state: string) => {
	switch (state) {
		case "correct":
			return "#6AAA64"; // Green
		case "present":
			return "#C9B458"; // Yellow
		case "absent":
			return "#787C7E"; // Gray
		default:
			return "#121213"; // Default Gray
	}
};

export default Tile;
