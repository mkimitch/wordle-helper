import React, { FC, useEffect, useRef, useState } from 'react'
import { useGlobalStore } from '../../context/GlobalStore'
import { getDefaultTile, getTileKey, updateTileState } from '../../utils/utils'
import './Tile.styles.scss'
import type { TileProps } from './Tile.types'

const Tile: FC<TileProps> = ({ row, col }) => {
	const { globalStore, setGlobalStore } = useGlobalStore()
	const tileKey = getTileKey(row, col)
	const inputRef = useRef<HTMLInputElement>(null)
	const [isActive, setIsActive] = useState(false)

	const tile = getDefaultTile(globalStore.boardState, tileKey)

	useEffect(() => {
		// Automatically focus the first tile on mount
		if (row === 1 && col === 1) {
			inputRef.current?.focus()
		}
	}, [row, col])

	const handleFocus = () => {
		setIsActive(true)
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const handleBlur = () => {
		setIsActive(false)
	}

	const cycleTileState = () => {
		if (!tile.value) return // Prevent state toggle if no letter is entered

		const newState =
			tile.state === 'correct'
				? 'present'
				: tile.state === 'present'
				? 'absent'
				: 'correct'

		updateTileState(setGlobalStore, tileKey, tile, { state: newState })
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toUpperCase()

		updateTileState(setGlobalStore, tileKey, tile, {
			value,
			state: value ? tile.state || 'absent' : '',
		})

		// Move focus to the next tile
		if (value) {
			// Find the next tile in the same row
			const nextCol = col + 1
			if (nextCol <= 5) {
				// If there's a next column in the same row
				const nextTileKey = getTileKey(row, nextCol)
				const nextTile = document.querySelector(`[data-key="${nextTileKey}"]`)
				if (nextTile instanceof HTMLElement) {
					nextTile.focus()
				}
			} else if (row < 6) {
				// If we're at the end of a row, move to the first tile of the next row
				const nextTileKey = getTileKey(row + 1, 1)
				const nextTile = document.querySelector(`[data-key="${nextTileKey}"]`)
				if (nextTile instanceof HTMLElement) {
					nextTile.focus()
				}
			}
		}
	}

	const handleTileClick = (e: React.MouseEvent | React.TouchEvent) => {
		e.stopPropagation()
		handleFocus() // Use the same focus handler
		cycleTileState()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace') {
			if (!tile.value) {
				// If current tile is empty, move to previous tile
				const prevCol = col - 1
				if (prevCol >= 1) {
					// If there's a previous column in the same row
					const prevTileKey = getTileKey(row, prevCol)
					const prevTile = document.querySelector(`[data-key="${prevTileKey}"]`)
					if (prevTile instanceof HTMLElement) {
						prevTile.focus()
					}
				} else if (row > 1) {
					// If we're at the start of a row, move to the last tile of the previous row
					const prevTileKey = getTileKey(row - 1, 5)
					const prevTile = document.querySelector(`[data-key="${prevTileKey}"]`)
					if (prevTile instanceof HTMLElement) {
						prevTile.focus()
					}
				}
			} else {
				// If current tile has a value, clear it
				updateTileState(setGlobalStore, tileKey, tile, {
					value: '',
					state: '',
				})
			}
		}
	}

	return (
		<div
			className={`tile ${tile.state} ${isActive ? 'active' : ''}`}
			onClick={handleTileClick}
			onFocus={handleFocus}
			onBlur={handleBlur}
			tabIndex={0}
			data-key={tileKey}
			style={{
				backgroundColor: getTileColor(tile.state),
				position: 'relative',
			}}
			role='gridcell'
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
			aria-live='polite'
		>
			<input
				ref={inputRef}
				type='text'
				maxLength={1}
				value={tile.value}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				aria-label={`Enter letter for position ${col} in row ${row}`}
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					color: 'transparent',
					height: '100%',
					left: 0,
					opacity: 0,
					position: 'absolute',
					top: 0,
					width: '100%',
					zIndex: 1,
				}}
			/>
			{tile.value}
		</div>
	)
}

const getTileColor = (state: string) => {
	switch (state) {
		case 'correct':
			return '#6AAA64' // Green
		case 'present':
			return '#C9B458' // Yellow
		case 'absent':
			return '#787C7E' // Gray
		default:
			return '#121213' // Default Gray
	}
}

export default Tile
