interface IHistoryEvent {
    description: string
    datetime: Date
    type: string
}
// TODO: move?
interface IIconProps {
    color?: string
    width?: number
    height?: number
}

export type { IHistoryEvent, IIconProps }