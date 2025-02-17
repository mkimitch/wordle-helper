import React, { FC } from 'react'
import { useGlobalStore } from '../../context/GlobalStore'
import './Results.styles.scss'

const Results: FC = () => {
	const { globalStore } = useGlobalStore()

	return (
		<div
			className='results'
			role='region'
			aria-label='Search results'
		>
			{globalStore.results.length > 0 ? (
				<>
					<h2 id='results-heading'>
						Possible words ({globalStore.results.length}):
					</h2>
					<div
						className='results-list'
						role='list'
						aria-labelledby='results-heading'
					>
						{globalStore.results.map(word => (
							<div
								key={word}
								className='result-item'
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
