interface IHistoryEvent {
    description: string
    datetime: Date
    type: string
}
interface IIconProps {
    color?: string
    width?: number
    height?: number
}

export type { IHistoryEvent, IIconProps }