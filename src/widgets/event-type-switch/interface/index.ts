import { PropsWithChildren } from "react"

interface IEventTypeSwitchProps extends PropsWithChildren {
    eventTypes: Array<string>
    activeEventTypeIndex: number
    onClickEventType(index: number): void
    onClickPrevEventType(): void
    onClickNextEventType(): void
}

export type { IEventTypeSwitchProps }