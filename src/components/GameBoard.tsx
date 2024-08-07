import React, { FC } from "react";

import Row from "./Row";

interface GameBoardProps {
	letters: { value: string; state: "black" | "yellow" | "green" }[];
	onInputChange: (index: number, value: string) => void;
	onToggleState: (index: number) => void;
}

const GameBoard: FC<GameBoardProps> = ({
	letters,
	onInputChange,
	onToggleState,
}) => {
	const rows = [];
	for (let i = 0; i < 6; i++) {
		rows.push(
			<Row
				key={i}
				letters={letters.slice(i * 5, i * 5 + 5)}
				startIndex={i * 5}
				onInputChange={onInputChange}
				onToggleState={onToggleState}
			/>
		);
	}

	return <div className="game-board">{rows}</div>;
};

export default GameBoard;
