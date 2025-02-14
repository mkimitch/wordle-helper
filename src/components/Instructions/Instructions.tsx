import React, { FC, useState } from 'react'
import './Instructions.styles.scss'

const Instructions: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='instructions-container'>
			<button
				className='instructions-button'
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
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
			{isOpen && (
				<div
					id='instructions-content'
					className='instructions-content'
					role='region'
					aria-label='How to play'
				>
					<p>
						Use keyboard to type letters. Click or tap tiles to change their
						color state.
					</p>
					<ul>
						<li>
							<span className='color-sample correct' />
							Letter is correct in this position
						</li>
						<li>
							<span className='color-sample present' />
							Letter exists but in different position
						</li>
						<li>
							<span className='color-sample absent' />
							Letter is not in the word
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default Instructions
