import React, { FC } from "react";

interface KeyboardProps {
	keyStates: { [key: string]: "black" | "yellow" | "green" };
}

const Keyboard: FC<KeyboardProps> = ({ keyStates }) => {
	const keys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

	return (
		<div className="keyboard">
			{keys.map((key, index) => (
				<button key={index} className={`key ${keyStates[key] || ""}`}>
					{key}
				</button>
			))}
		</div>
	);
};

export default Keyboard;
