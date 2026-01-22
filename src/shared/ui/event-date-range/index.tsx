import { FC, useLayoutEffect, useRef } from "react"
import styled from "styled-components";
import gsap from "gsap";
import { IEventDateRangeProps, IEventYearProps, IYearDigitProps } from "./interface";


const YearDigitContainer = styled.span`
    width: calc(1ch - 0.02em);
    height: 1em;
    overflow: hidden;
    position: relative;
`

const YearDigitStack = styled.span`
    display: flex;
    flex-direction: column;
`

const YearDigitStackItem = styled.span`
    height: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
`

const YearContainer = styled.div`
    / * prevents messing around with text on user-select (breaks text placement on text select with keyboard) */
    user-select: none;
    display: flex;
    line-height: 1;
`

const EventDateRangeContainer = styled.div`
    display: inline-flex;
    position: relative;
    font-size: ${({theme}) => theme.fontSize["2xl"]};
    text-wrap: nowrap;
    font-weight: bold;
    letter-spacing: -0.02em;
    line-height: 160px;
    transform: translateX(-16px);
    > mark:first-child {
        color: ${({theme}) => theme.color.text.hightlightPrimary};
        background: none;
    }
    > mark:last-child {
        color: ${({theme}) => theme.color.text.hightlightSecondary};
        color: ;
        background: none;
    }
    @media (max-width: 768px) {
        font-size: ${({theme}) => theme.fontSize.xl};
        line-height: inherit;
        transform: none;
    }
`

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
        <YearDigitContainer>
            <YearDigitStack ref={ref}>
                {Array.from({ length: 10 }, (_, i) => (
                    <YearDigitStackItem key={i}>{i}</YearDigitStackItem>
                ))}
            </YearDigitStack>
        </YearDigitContainer>
    )
}

const EventYear: FC<IEventYearProps> = ({ year }) => {
    const digits = String(year).padStart(4, "0").split("");

    return (
        <YearContainer className="year">
            {digits.map((d, i) => (
                <YearDigit key={i} value={Number(d)} />
            ))}
        </YearContainer>
    )
}
const EventDateRange: FC<IEventDateRangeProps> = ({ min, max }) => {
    return <EventDateRangeContainer>
        <mark>
            <EventYear year={min.getFullYear()} />
        </mark>
        &nbsp;&nbsp;
        <mark>
            <EventYear year={max.getFullYear()} />
        </mark>
    </EventDateRangeContainer>
}

export { EventDateRange }