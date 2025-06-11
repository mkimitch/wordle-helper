import React, { FC, useEffect, useState } from 'react'
import { useGlobalStore } from '../../context/GlobalStore'
import { GlobalStoreState } from '../../context/GlobalStore.types'
import { getDefaultTile, getTileKey } from '../../utils/utils'
import Tile from '../Tile/Tile'
import Instructions from '../Instructions/Instructions'
import './Board.styles.scss'

const Board: FC = () => {
	const { globalStore, setGlobalStore } = useGlobalStore()
	const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
	const ROWS = 6
	const COLS = 5

	useEffect(() => {
		// Initialize board state if empty
		if (Object.keys(globalStore.boardState).length === 0) {
			const initialState: GlobalStoreState['boardState'] = {}
			for (let row = 1; row <= ROWS; row++) {
				for (let col = 1; col <= COLS; col++) {
					const key = getTileKey(row, col)
					initialState[key] = { value: '', state: '' }
				}
			}
			setGlobalStore(prev => ({ ...prev, boardState: initialState }))
		}

		// Set initial focus
		setGlobalStore(prev => ({
			...prev,
			focusedTile: { row: 1, col: 1 },
		}))
	}, [])

	const handleKeyDown = (e: KeyboardEvent) => {
		const { focusedTile } = globalStore
		if (!focusedTile) return

		const currentKey = getTileKey(focusedTile.row, focusedTile.col)
		const currentTile = globalStore.boardState[currentKey]

		if (/^[a-zA-Z]$/.test(e.key) && e.key.length === 1) {
			const value = e.key.toUpperCase()
			setGlobalStore(prev => ({
				...prev,
				boardState: {
					...prev.boardState,
					[currentKey]: { value, state: 'absent' },
				},
			}))

			// Move to next empty tile if available
			if (focusedTile.col < COLS) {
				setGlobalStore(prev => ({
					...prev,
					focusedTile: { row: focusedTile.row, col: focusedTile.col + 1 },
				}))
			} else if (focusedTile.row < ROWS) {
				setGlobalStore(prev => ({
					...prev,
					focusedTile: { row: focusedTile.row + 1, col: 1 },
				}))
			}
		} else if (e.key === 'Backspace' || e.key === 'Delete') {
			// If current tile has a value, clear it
			if (currentTile.value) {
				setGlobalStore(prev => ({
					...prev,
					boardState: {
						...prev.boardState,
						[currentKey]: { value: '', state: '' },
					},
				}))
			} else {
				// Move to previous tile if possible
				if (focusedTile.col > 1) {
					const prevCol = focusedTile.col - 1
					const prevKey = getTileKey(focusedTile.row, prevCol)
					const prevTile = globalStore.boardState[prevKey]
					setGlobalStore(prev => ({
						...prev,
						boardState: {
							...prev.boardState,
							[prevKey]: { value: '', state: '' },
						},
						focusedTile: { row: focusedTile.row, col: prevCol },
					}))
				} else if (focusedTile.row > 1) {
					// Move to last tile of previous row
					const prevRow = focusedTile.row - 1
					const prevKey = getTileKey(prevRow, COLS)
					const prevTile = globalStore.boardState[prevKey]
					setGlobalStore(prev => ({
						...prev,
						boardState: {
							...prev.boardState,
							[prevKey]: { value: '', state: '' },
						},
						focusedTile: { row: prevRow, col: COLS },
					}))
				}
			}
		} else if (e.key === 'ArrowLeft' && focusedTile.col > 1) {
			setGlobalStore(prev => ({
				...prev,
				focusedTile: { row: focusedTile.row, col: focusedTile.col - 1 },
			}))
		} else if (e.key === 'ArrowRight' && focusedTile.col < COLS) {
			setGlobalStore(prev => ({
				...prev,
				focusedTile: { row: focusedTile.row, col: focusedTile.col + 1 },
			}))
		} else if (e.key === 'ArrowUp' && focusedTile.row > 1) {
			setGlobalStore(prev => ({
				...prev,
				focusedTile: { row: focusedTile.row - 1, col: focusedTile.col },
			}))
		} else if (e.key === 'ArrowDown' && focusedTile.row < ROWS) {
			setGlobalStore(prev => ({
				...prev,
				focusedTile: { row: focusedTile.row + 1, col: focusedTile.col },
			}))
		} else if (e.key === 'Enter' || e.key === ' ') {
			// Cycle tile state only if there's a letter
			if (currentTile.value) {
				const stateTransitions: Record<
					string,
					GlobalStoreState['boardState'][string]['state']
				> = {
					'': 'correct',
					correct: 'present',
					present: 'absent',
					absent: '',
				}
				const nextState = stateTransitions[currentTile.state] || 'correct'
				setGlobalStore(prev => ({
					...prev,
					boardState: {
						...prev.boardState,
						[currentKey]: { ...currentTile, state: nextState },
					},
				}))
			}
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [globalStore.focusedTile, globalStore.boardState])

	return (
		<div className="board-container">
			<div className="instructions-toggle">
				<button
					className="instructions-button"
					onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
					aria-expanded={isInstructionsOpen}
					aria-controls="instructions-content"
					aria-label="How to play instructions"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M12 16v-4M12 8h.01" />
					</svg>
				</button>
				<Instructions isOpen={isInstructionsOpen} />
			</div>

			<div className="board" role="grid" aria-label="Wordle game board" tabIndex={-1}>
				{Array.from({ length: ROWS }, (_, row) => (
					<div key={row} className="row" role="row">
						{Array.from({ length: COLS }, (_, col) => (
							<Tile
								key={getTileKey(row + 1, col + 1)}
								row={row + 1}
								col={col + 1}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Board
