export type TileStatus = 'correct' | 'present' | 'absent' | ''

export interface TileState {
	state: TileStatus
	value: string
}

export interface TileProps {
	col: number
	focused?: boolean
	row: number
}
