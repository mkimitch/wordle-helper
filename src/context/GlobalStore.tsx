import React, { createContext, FC, useContext, useState } from 'react'
import type { GlobalStoreContextType, GlobalStoreState } from './GlobalStore.types'

export const GlobalStoreContext = createContext<
	GlobalStoreContextType | undefined
>(undefined)

export const useGlobalStore = () => {
	const context = useContext(GlobalStoreContext)
	if (!context) {
		throw new Error('useGlobalStore must be used within a GlobalStoreProvider')
	}
	return context
}

const createInitialBoardState = () => {
	const boardState: GlobalStoreState['boardState'] = {}
	for (let row = 1; row <= 5; row++) {
		for (let col = 1; col <= 5; col++) {
			boardState[`${row}-${col}`] = { value: '', state: '' }
		}
	}
	return boardState
}

export const GlobalStoreProvider: FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [globalStore, setGlobalStore] = useState<GlobalStoreState>({
		solutionState: {
			exclude: [],
			include: [],
			letters: {},
		},
		boardState: createInitialBoardState(),
		focusedTile: null,
		results: [],
	})

	return (
		<GlobalStoreContext.Provider value={{ globalStore, setGlobalStore }}>
			{children}
		</GlobalStoreContext.Provider>
	)
}
