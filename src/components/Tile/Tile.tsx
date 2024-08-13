import "./Tile.styles.scss";

import React, { FC, useRef, useEffect } from "react";

import type { TileProps } from "./Tile.types";
import { useGlobalStore } from "../../context/GlobalStore";

const Tile: FC<TileProps> = ({ row, col }) => {
	const { globalStore, setGlobalStore } = useGlobalStore();
	const tileKey = `${row}-${col}`;
	const inputRef = useRef<HTMLInputElement>(null);

	// Provide a default object to avoid undefined errors
	const tile = globalStore.boardState[tileKey] || { state: "", value: "" };

	useEffect(() => {
		// Automatically focus the first tile on mount
		if (row === 1 && col === 1) {
			inputRef.current?.focus();
		}
	}, [row, col]);

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toUpperCase();

		setGlobalStore((prevState) => ({
			...prevState,
			boardState: {
				...prevState.boardState,
				[tileKey]: {
					...tile,
					value,
					state: value ? tile.state || "absent" : "", // Default to absent if not set
				},
			},
		}));

		// Move focus to the next tile
		if (value && inputRef.current) {
			const nextTile = inputRef.current.nextElementSibling as HTMLInputElement;
			if (nextTile) {
				nextTile.focus();
			}
		}
	};

	const handleTileClick = (e: React.MouseEvent | React.TouchEvent) => {
		e.stopPropagation(); // Prevent the click from bubbling up to the input
		if (inputRef.current) {
			inputRef.current.focus(); // Focus the input to trigger the keyboard
		}
		cycleTileState(); // Trigger the state cycle
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Handle backspace to clear the current tile and move focus to the previous one
		if (e.key === "Backspace" && !tile.value && inputRef.current) {
			const prevTile = inputRef.current
				.previousElementSibling as HTMLInputElement;
			if (prevTile) {
				prevTile.focus();
			}
		}
	};

	return (
		<div
			className={`tile ${tile.state}`}
			onClick={handleTileClick}
			style={{
				backgroundColor: getTileColor(tile.state),
				position: "relative",
			}}
		>
			<input
				ref={inputRef}
				type="text"
				maxLength={1}
				value={tile.value}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				style={{
					position: "absolute",
					opacity: 0,
					width: "100%",
					height: "100%",
					top: 0,
					left: 0,
					border: "none",
					backgroundColor: "transparent",
					color: "transparent",
					zIndex: 1,
				}}
			/>
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
