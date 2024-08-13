import type { TileState } from "../components/Tile/Tile.types";

export interface LetterPosition {
	is: string | null;
	isnot: string[];
}

// Define the solution state type
export interface SolutionState {
	exclude: string[];
	include: string[];
	letters: {
		1: LetterPosition;
		2: LetterPosition;
		3: LetterPosition;
		4: LetterPosition;
		5: LetterPosition;
	};
}

export interface BoardState {
	[key: string]: TileState;
}

// Define the global store state type
export interface GlobalStoreState {
	boardState: BoardState;
	results: string[];
	solutionState: SolutionState;
}

// Define the context type
export interface GlobalStoreContextType {
	globalStore: GlobalStoreState;
	setGlobalStore: React.Dispatch<React.SetStateAction<GlobalStoreState>>;
}
