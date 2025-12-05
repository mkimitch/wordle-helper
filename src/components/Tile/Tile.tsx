import React, { FC, useEffect, useRef } from 'react'
import { useGlobalStore } from '../../context/GlobalStore'
import { getDefaultTile, getTileKey } from '../../utils/utils'
import './Tile.styles.scss'
import type { TileProps, TileStatus } from './Tile.types'

const Tile: FC<TileProps> = ({ row, col }) => {
	const { globalStore, setGlobalStore } = useGlobalStore()
	const tileKey = getTileKey(row, col)
	const inputRef = useRef<HTMLDivElement>(null)
	const tile = getDefaultTile(globalStore.boardState, tileKey)
	const isFocused =
		globalStore.focusedTile?.row === row && globalStore.focusedTile?.col === col

	useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isFocused])

	const handleClick = () => {
		if (isFocused && tile.value) {
			// If already focused and has a value, cycle the state
			const stateTransitions: Record<TileStatus, TileStatus> = {
				'': 'correct',
				correct: 'present',
				present: 'absent',
				absent: '',
			}
			const nextState: TileStatus = stateTransitions[tile.state]
			setGlobalStore(prev => ({
				...prev,
				boardState: {
					...prev.boardState,
					[tileKey]: { ...tile, state: nextState },
				},
			}))
		} else {
			// Set focus to this tile
			setGlobalStore(prev => ({
				...prev,
				focusedTile: { row, col },
			}))
		}
	}

	return (
		<div
			aria-label={`${
				row === 1
					? 'First'
					: row === 2
					? 'Second'
					: row === 3
					? 'Third'
					: row === 4
					? 'Fourth'
					: row === 5
					? 'Fifth'
					: 'Sixth'
			} row, ${
				col === 1
					? 'first'
					: col === 2
					? 'second'
					: col === 3
					? 'third'
					: col === 4
					? 'fourth'
					: 'fifth'
			} letter${tile.value ? `: ${tile.value}` : ''}`}
			aria-selected={isFocused}
			className={`tile ${tile.state} ${isFocused ? 'focused' : ''}`}
			onClick={handleClick}
			ref={inputRef}
			role='gridcell'
			tabIndex={isFocused ? 0 : -1}
		>
			{tile.value}
		</div>
	)
}

export default Tile
