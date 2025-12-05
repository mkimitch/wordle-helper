import type { Dispatch, SetStateAction } from 'react'
import type { TileState } from '../components/Tile/Tile.types'

export interface LetterPosition {
	is: string | null
	isnot: string[]
}

// Define the solution state type
export interface SolutionState {
	letters: Record<string, LetterPosition>
	include: string[]
	exclude: string[]
}

export interface Tile extends TileState {}

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
