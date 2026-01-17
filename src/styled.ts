import styled, { css } from "styled-components";

interface ICircleButtonProps {
    index: number;
    length: number;
    activeIndex: number
}

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
`

const activeElementStyles = css`
    background: white;
    border: 1px solid #929AA9;
    > span {
        visibility: visible;
    }
`

const DEFAUILT_ROTATE_DEG_ANGLE = 60
const degToRad = (degrees: number) => {
    return (degrees % 360) * (Math.PI / 180)
}

const CircleButton = styled.button<ICircleButtonProps>`
  ${({ index, length, activeIndex }) => {
        const initialRotateRadAngle = degToRad(DEFAUILT_ROTATE_DEG_ANGLE)
        const elementRotationRadAngle = 2 * Math.PI / length * index
        const activeElementRotationRadAngle = 2 * Math.PI / length * activeIndex
        const rotateRadAngle = elementRotationRadAngle - initialRotateRadAngle - activeElementRotationRadAngle


        // TODO: refactor to avoid code duplication
        return activeIndex === index
            ? `
            ${defaultComponentStyles}
            ${activeElementStyles}
            transform:
                translate(-50%, -50%)
                rotate(${rotateRadAngle}rad)
                translate(265px)
                scale(1);
            
            > span {
                visibility: visible;
                transform: rotate(${-rotateRadAngle}rad);
            }`
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
                visibility: hidden;
                transform: rotate(${-rotateRadAngle}rad);
            }
    `;
    }}
`;

export { CircleButton }