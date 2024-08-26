import React, { createContext, useContext, useState, ReactNode } from 'react'
import type {
	GlobalStoreState,
	GlobalStoreContextType,
} from './GlobalStore.types'

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

export const GlobalStoreProvider = ({ children }: { children: ReactNode }) => {
	const [globalStore, setGlobalStore] = useState<GlobalStoreState>({
		solutionState: {
			exclude: [],
			include: [],
			letters: {
				1: { is: null, isnot: [] },
				2: { is: null, isnot: [] },
				3: { is: null, isnot: [] },
				4: { is: null, isnot: [] },
				5: { is: null, isnot: [] },
			},
		},
		boardState: {
			'1-1': { state: '', value: '' },
			'1-2': { state: '', value: '' },
			'1-3': { state: '', value: '' },
			'1-4': { state: '', value: '' },
			'1-5': { state: '', value: '' },
			'2-1': { state: '', value: '' },
			'2-2': { state: '', value: '' },
			'2-3': { state: '', value: '' },
			'2-4': { state: '', value: '' },
			'2-5': { state: '', value: '' },
			'3-1': { state: '', value: '' },
			'3-2': { state: '', value: '' },
			'3-3': { state: '', value: '' },
			'3-4': { state: '', value: '' },
			'3-5': { state: '', value: '' },
			'4-1': { state: '', value: '' },
			'4-2': { state: '', value: '' },
			'4-3': { state: '', value: '' },
			'4-4': { state: '', value: '' },
			'4-5': { state: '', value: '' },
			'5-1': { state: '', value: '' },
			'5-2': { state: '', value: '' },
			'5-3': { state: '', value: '' },
			'5-4': { state: '', value: '' },
			'5-5': { state: '', value: '' },
		},
		results: [],
	})

	return (
		<GlobalStoreContext.Provider value={{ globalStore, setGlobalStore }}>
			{children}
		</GlobalStoreContext.Provider>
	)
}
