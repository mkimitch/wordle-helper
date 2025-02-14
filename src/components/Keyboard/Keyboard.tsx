import React, { FC } from 'react'

interface KeyboardProps {
	keyStates: { [key: string]: 'absent' | 'present' | 'correct' }
}

const Keyboard: FC<KeyboardProps> = ({ keyStates }) => {
	const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')

	return (
		<div className='keyboard'>
			{keys.map((key, index) => (
				<button
					className={`key ${keyStates[key] || ''}`}
					key={index}
				>
					{key}
				</button>
			))}
		</div>
	)
}

export default Keyboard
