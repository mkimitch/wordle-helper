import React, { FC } from 'react'
import './Instructions.styles.scss'

interface InstructionsProps {
	isOpen: boolean
}

const Instructions: FC<InstructionsProps> = ({ isOpen }) => {
	if (!isOpen) return null

	return (
		<div
			aria-label='How to play'
			className='instructions'
			id='instructions-content'
			role='region'
		>
			<div className='instructions-section'>
				<h2>Instructions</h2>
				<p>
					Enter a word that you want to solve for. The word must be exactly 5
					letters long. Then, use the keyboard or click/tap to mark each letter
					with its correct state from Wordle:
				</p>
				<ul className='state-list'>
					<li>
						<span className='tile correct'>A</span> - Letter is in the correct
						position (green)
					</li>
					<li>
						<span className='tile present'>B</span> - Letter is in the word but
						wrong position (yellow)
					</li>
					<li>
						<span className='tile absent'>C</span> - Letter is not in the word
						(gray)
					</li>
				</ul>
			</div>

			<div className='instructions-section controls'>
				<h3>Keyboard Controls</h3>
				<ul>
					<li>⌨️ Type letters to fill tiles</li>
					<li>
						🔄 Space/Enter to cycle tile states: gray → green → yellow → empty
					</li>
					<li>⬅️➡️ Arrow keys to navigate between tiles</li>
					<li>⌫ Backspace to clear letters</li>
				</ul>

				<h3>Mouse/Touch Controls</h3>
				<ul>
					<li>🖱️ Click/tap once to focus a tile</li>
					<li>🔄 Click/tap again to cycle its state (when populated)</li>
				</ul>
			</div>

			<div className='instructions-section'>
				<p>
					Click "Find Solutions" to see all possible words that match your
					constraints. The solutions are sorted by frequency of use in English
					text, with more common words appearing first.
				</p>
			</div>
		</div>
	)
}

export default Instructions
