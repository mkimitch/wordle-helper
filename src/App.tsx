import './styles/globals.scss'

import React, { FC } from 'react'
import { GlobalStoreProvider, useGlobalStore } from './context/GlobalStore'
import type { BoardState, SolutionState } from './context/GlobalStore.types'

import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'
import Instructions from './components/Instructions/Instructions'
import Results from './components/Results/Results'
import { wordleAnswersList } from './utils/utils'

const WordleHelper: FC = () => {
	const { globalStore, setGlobalStore } = useGlobalStore()

	const getPossibleWords = ({
		wordleAnswersList,
		solutionState,
	}: {
		wordleAnswersList: string[]
		solutionState: SolutionState
	}): string[] => {
		// Input validation
		if (!wordleAnswersList?.length || !solutionState) {
			return []
		}

		const { exclude, include, letters } = solutionState

		// Normalize input
		const normalizedInclude = (include || []).map(letter =>
			letter.toLowerCase()
		)
		const normalizedExclude = (exclude || []).map(letter =>
			letter.toLowerCase()
		)

		const includesLetter = (word: string) =>
			normalizedInclude.every(letter => word.includes(letter))

		const excludesLetter = (word: string) =>
			!normalizedExclude.some(letter => word.includes(letter))

		try {
			const letterPatterns = Object.entries(letters).map(
				([position, { is, isnot }]) => {
					const pattern = new RegExp(
						`^.{${Number(position) - 1}}${
							is
								? is.toLowerCase()
								: isnot?.length > 0
								? `[^${isnot.join('').toLowerCase()}]`
								: '.'
						}.{${5 - Number(position)}}$`,
						'i'
					)
					return { pattern, position }
				}
			)

			return wordleAnswersList.filter(word => {
				if (!word || typeof word !== 'string') return false
				if (!excludesLetter(word)) return false
				if (!includesLetter(word)) return false
				return letterPatterns.every(({ pattern }) => pattern.test(word))
			})
		} catch (error) {
			console.error('Error in getPossibleWords:', error)
			return []
		}
	}

	const handleSearch = () => {
		const solutionState = extractSolutionState(globalStore.boardState)
		const possibleWords = getPossibleWords({
			wordleAnswersList,
			solutionState,
		})

		setGlobalStore(prevState => ({
			...prevState,
			results: possibleWords, // Update results in the global store
		}))
	}

	return (
		<main className='wordle-helper'>
			<h1 className='visually-hidden'>Wordle Helper</h1>
			<Instructions />
			<Board />
			<button
				className='search-button'
				onClick={handleSearch}
				aria-label='Search for possible words'
			>
				Search
			</button>
			<Results />
			<Footer />
		</main>
	)
}

const extractSolutionState = (boardState: BoardState): SolutionState => {
	const solutionState: SolutionState = {
		exclude: [],
		include: [],
		letters: {
			1: { is: null, isnot: [] },
			2: { is: null, isnot: [] },
			3: { is: null, isnot: [] },
			4: { is: null, isnot: [] },
			5: { is: null, isnot: [] },
		},
	}

	Object.entries(boardState).forEach(([key, { value, state }]) => {
		const position = parseInt(key.split('-')[1], 10) as 1 | 2 | 3 | 4 | 5
		if (value) {
			if (state === 'correct') {
				solutionState.letters[position].is = value
				if (!solutionState.include.includes(value)) {
					solutionState.include.push(value)
				}
			} else if (state === 'present') {
				if (!solutionState.include.includes(value)) {
					solutionState.include.push(value)
				}
				solutionState.letters[position].isnot.push(value)
			} else if (state === 'absent') {
				if (!solutionState.exclude.includes(value)) {
					solutionState.exclude.push(value)
				}
			}
		}
	})

	return solutionState
}

const App: FC = () => (
	<GlobalStoreProvider>
		<WordleHelper />
	</GlobalStoreProvider>
)

export default App
