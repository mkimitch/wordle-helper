import React, { FC } from "react";

import Letter from "./Letter";

interface RowProps {
	letters: { value: string; state: "black" | "yellow" | "green" }[];
	startIndex: number;
	onInputChange: (index: number, value: string) => void;
	onToggleState: (index: number) => void;
}

const Row: FC<RowProps> = ({
	letters,
	startIndex,
	onInputChange,
	onToggleState,
}) => {
	return (
		<div className="row">
			{letters.map((letter, index) => (
				<Letter
					key={index}
					index={startIndex + index}
					value={letter.value}
					state={letter.state}
					onInputChange={onInputChange}
					onToggleState={onToggleState}
				/>
			))}
		</div>
	);
};

export default Row;
