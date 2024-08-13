import "./Tile.styles.scss";

import React, { FC } from "react";

import type { TileProps } from "./Tile.types";
import { useGlobalStore } from "../../context/GlobalStore";

const Tile: FC<TileProps> = ({ row, col }) => {
	const { globalStore, setGlobalStore } = useGlobalStore();
	const tileKey = `${row}-${col}`;

	// Provide a default object to avoid undefined errors
	const tile = globalStore.boardState[tileKey] || { state: "", value: "" };

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

	return (
		<div
			className={`tile ${tile.state}`}
			onClick={cycleTileState}
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
