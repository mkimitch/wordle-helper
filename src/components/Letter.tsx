import React, { FC } from "react";

interface LetterProps {
	index: number;
	value: string;
	state: "black" | "yellow" | "green";
	onInputChange: (index: number, value: string) => void;
	onToggleState: (index: number) => void;
}

const Letter: FC<LetterProps> = ({
	index,
	value,
	state,
	onInputChange,
	onToggleState,
}) => {
	return (
		<input
			type="text"
			className={`letter ${state}`}
			maxLength={1}
			value={value}
			onChange={(e) => onInputChange(index, e.target.value)}
			onClick={() => onToggleState(index)}
		/>
	);
};

export default Letter;
