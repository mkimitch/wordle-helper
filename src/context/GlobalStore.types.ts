import type { TileState } from '../components/Tile/Tile.types'
import type { Dispatch, SetStateAction } from 'react'

export interface LetterPosition {
	is: string | null
	isnot: string[]
}

// Define the solution state type
export interface SolutionState {
	letters: Record<string, { is: string | null; isnot: string[] }>
	include: string[]
	exclude: string[]
}

export interface Tile {
	value: string
	state: 'correct' | 'present' | 'absent' | ''
}

export interface BoardState {
	[key: string]: Tile
}

export interface FocusedTile {
	row: number
	col: number
}

// Define the global store state type
export interface GlobalStoreState {
	boardState: BoardState
	focusedTile: FocusedTile | null
	results: string[]
	solutionState: SolutionState
}

// Define the context type
export interface GlobalStoreContextType {
	globalStore: GlobalStoreState
	setGlobalStore: Dispatch<SetStateAction<GlobalStoreState>>
}
