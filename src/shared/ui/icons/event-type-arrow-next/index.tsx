import { FC } from "react"
import { IIconProps } from "../../../interface"


const EventTypeArrowNext: FC<IIconProps> = ({color = "currentColor", width = 9, height = 14}) => {
    return <svg width={width} height={height} viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.66418 0.707108L1.41419 6.95711L7.66418 13.2071" stroke={color} strokeWidth="2"/>
    </svg>
}

export default EventTypeArrowNext