import React, { FC } from 'react'
import './Footer.styles.scss'

const Footer: FC = () => {
	return (
		<footer>
			<a
				aria-label='Wordle Helper GitHub repository'
				href='https://github.com/mkimitch/wordle-helper'
			>
				<img
					alt=''
					src='https://img.shields.io/badge/GitHub-Repo-blue%3Flogo%3Dgithub?style=flat&logo=github&labelColor=gray&color=blue'
				/>
			</a>
		</footer>
	)
}

export default Footer
