export interface TileState {
	state: string
	value: string
}

export interface TileProps {
	col: number
	focused?: boolean
	row: number
}
