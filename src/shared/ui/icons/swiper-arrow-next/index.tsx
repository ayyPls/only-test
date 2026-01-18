import { FC } from "react"
import { IIconProps } from "../../../interface"


const SwiperArrowIcon: FC<IIconProps> = ({ color = "currentColor", width = 8, height = 12 }) => {
    return <svg width={width} height={height} viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.707092 0.707093L5.70709 5.70709L0.707093 10.7071" stroke={color} strokeWidth="2" />
    </svg>
}

export default SwiperArrowIcon