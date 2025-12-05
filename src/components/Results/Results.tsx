import React, { FC } from 'react'
import { useGlobalStore } from '../../context/GlobalStore'
import './Results.styles.scss'

const Results: FC = () => {
	const { globalStore } = useGlobalStore()

	return (
		<div
			aria-label='Search results'
			className='results'
			role='region'
		>
			{globalStore.results.length > 0 ? (
				<>
					<h2 id='results-heading'>
						Possible words ({globalStore.results.length}):
					</h2>
					<div
						aria-labelledby='results-heading'
						className='results-list'
						role='list'
					>
						{globalStore.results.map(word => (
							<div
								className='result-item'
								key={word}
								role='listitem'
							>
								{word}
							</div>
						))}
					</div>
				</>
			) : (
				<p role='alert'>No results found. Please enter valid letters.</p>
			)}
		</div>
	)
}

export default Results
