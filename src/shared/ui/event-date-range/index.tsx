import { FC, useLayoutEffect, useRef } from "react"
import { IEventDateRangeProps, IEventYearProps, IYearDigitProps } from "./interface";
import gsap from "gsap";

const YearDigit: FC<IYearDigitProps> = ({ value }) => {
    const ref = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        gsap.to(ref.current, {
            y: `-${value * 10}%`,
            duration: 0.6,
            ease: "power2.out"
        })
    }, [value])

    return (
        <span className="digit">
            <span ref={ref} className="digit-stack">
                {Array.from({ length: 10 }, (_, i) => (
                    <span key={i}>{i}</span>
                ))}
            </span>
        </span>
    )
}

const EventYear: FC<IEventYearProps> = ({ year }) => {
    const digits = String(year).padStart(4, "0").split("");

    return (
        <div className="year">
            {digits.map((d, i) => (
                <YearDigit key={i} value={Number(d)} />
            ))}
        </div>
    )
}
const EventDateRange: FC<IEventDateRangeProps> = ({ min, max }) => {
    return <div className='years-text'>
        <mark><EventYear year={min.getFullYear()} /></mark>
        &nbsp;&nbsp;
        <mark><EventYear year={max.getFullYear()} /></mark>
    </div>
}

export { EventDateRange }