import React, { FC, useEffect, useState } from 'react'
import { useGlobalStore } from '../../context/GlobalStore'
import { GlobalStoreState } from '../../context/GlobalStore.types'
import { getDefaultTile, getTileKey } from '../../utils/utils'
import Instructions from '../Instructions/Instructions'
import Tile from '../Tile/Tile'
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
		const currentTile = getDefaultTile(globalStore.boardState, currentKey)

		if (/^[a-zA-Z]$/.test(e.key)) {
			// Handle letter input
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
			}
		} else if (e.key === 'Backspace') {
			if (currentTile.value) {
				// Clear current tile if it has a value
				setGlobalStore(prev => ({
					...prev,
					boardState: {
						...prev.boardState,
						[currentKey]: { ...currentTile, value: '' },
					},
				}))
			} else if (focusedTile.col > 1) {
				// Move to previous tile and clear it
				const prevCol = focusedTile.col - 1
				const prevKey = getTileKey(focusedTile.row, prevCol)
				const prevTile = getDefaultTile(globalStore.boardState, prevKey)
				setGlobalStore(prev => ({
					...prev,
					boardState: {
						...prev.boardState,
						[prevKey]: { ...prevTile, value: '' },
					},
					focusedTile: { row: focusedTile.row, col: prevCol },
				}))
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
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [globalStore.focusedTile, globalStore.boardState])

	return (
		<>
			<div className='instructions-toggle'>
				<button
					className='instructions-button'
					onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
					aria-expanded={isInstructionsOpen}
					aria-controls='instructions-content'
					aria-label='How to play instructions'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						aria-hidden='true'
					>
						<circle
							cx='12'
							cy='12'
							r='10'
						/>
						<path d='M12 16v-4M12 8h.01' />
					</svg>
				</button>
				<Instructions isOpen={isInstructionsOpen} />
			</div>
			<div className='board-container'>
				<div
					className='board'
					role='grid'
					aria-label='Wordle game board'
					tabIndex={-1}
				>
					{Array.from({ length: ROWS }, (_, row) => (
						<div
							key={row}
							className='row'
							role='row'
						>
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
		</>
	)
}

export default Board
