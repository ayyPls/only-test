import styled from "styled-components";
import { IEventTypeButtonProps } from "./interface";
import { DEFAUILT_ROTATE_DEG_ANGLE } from "./const";
import { degToRad } from "../../utils";


const RadialElementContentContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    
    > span {
        opacity: 0;
        visibility: hidden;
        transition: opacity ease-in-out .5s .6s;
        color: #42567A;
        font-weight: medium;
    }
    // TODO: fix button content rotation on parent transform transition (on active event type change)
    > button {
        width: 56px;
        height: 56px;
        border-radius: 100%;
        border: 1px solid #303E5850;
        background: #42567A;
        transition: scale ease-in-out .5s, background ease-in-out .3s;
        scale: 0.15;
        &:hover, &:focus {
            scale: 1;
            background: #F4F5F9;
        }
    }
`


const EventTypeRadialElement = styled.div<IEventTypeButtonProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 20px;
    line-height: 30px;
    transition: transform ease-in-out .6s;

    ${({$activeIndex, $elementIndex, $elementsCount, $startAngleDeg = DEFAUILT_ROTATE_DEG_ANGLE}) => {
        const initialRotateRadAngle = degToRad($startAngleDeg)
            const elementRotationRadAngle = 2 * Math.PI / $elementsCount * $elementIndex
            const activeElementRotationRadAngle = 2 * Math.PI / $elementsCount * $activeIndex
            const rotateRadAngle = elementRotationRadAngle - initialRotateRadAngle - activeElementRotationRadAngle

            const isActiveElement = $activeIndex === $elementIndex
        return `
            transform:
                translate(-28px, -28px)
                rotate(${rotateRadAngle}rad)
                translate(265px)
                scale(1);
            > div {
                transform: rotate(${-rotateRadAngle}rad);
                ${isActiveElement && `
                    > button {
                        scale: 1;
                        background: #F4F5F9;
                    }
                    > span {
                        visibility: visible;
                        opacity: 1;
                    }
                `}
            }
        `
    }}
`

export { RadialElementContentContainer, EventTypeRadialElement }