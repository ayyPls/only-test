import styled, { css } from "styled-components";
import { IEventType8uttonProps } from "./interface";
import { DEFAUILT_ROTATE_DEG_ANGLE } from "./const";
import { degToRad } from "../../utils";

const defaultComponentStyles = css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: #929AA9;
    background: #42567A;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: center center;
    transition: transform .5s ease-in-out, background .5s;
    > span {
        visibility: hidden;
    }
    > .active-item-text {
        transition: opacity .8s ease-in-out;
    }
`

const activeElementStyles = css`
    background: #F4F5F9;
    border: 1px solid #929AA9;
    > span {
        visibility: visible;
    }
`

const EventTypeButton = styled.button<IEventType8uttonProps>`
  ${({ $elementIndex, $elementsCount, $activeIndex }) => {
        const initialRotateRadAngle = degToRad(DEFAUILT_ROTATE_DEG_ANGLE)
        const elementRotationRadAngle = 2 * Math.PI / $elementsCount * $elementIndex
        const activeElementRotationRadAngle = 2 * Math.PI / $elementsCount * $activeIndex
        const rotateRadAngle = elementRotationRadAngle - initialRotateRadAngle - activeElementRotationRadAngle


        // TODO: refactor to avoid code duplication
        return $activeIndex === $elementIndex
            ? `
            ${defaultComponentStyles}
            ${activeElementStyles}
            transform:
                translate(-50%, -50%)
                rotate(${rotateRadAngle}rad)
                translate(265px)
                scale(1);
            
            > span {
                transform: rotate(${-rotateRadAngle}rad);
            }
            + .active-item-text {
                // position: absolute;
                // font-size: 20px;
                // color: #42567A;
                // font-weight: bold;
                // visibility: visible;
                // opacity: 1;
                // transition: opacity .8s ease-in-out;
                // transform: rotate(${-rotateRadAngle}rad);
            }
            `
            : `
            ${defaultComponentStyles}
            transform: translate(-50%, -50%)
                    rotate(${rotateRadAngle}rad)
                    translate(265px)
                    scale(.107);
            &:hover, &:focus {
                ${activeElementStyles}
                transform:
                    translate(-50%, -50%)
                    rotate(${rotateRadAngle}rad)
                    translate(265px)
                    scale(1);
            }

            > span {
                transform: rotate(${-rotateRadAngle}rad);
            }
        `;
    }}
`;

export { EventTypeButton }