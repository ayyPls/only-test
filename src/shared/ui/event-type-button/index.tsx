import styled from "styled-components";
import { IEventTypeButtonProps } from "./interface";
import { DEFAUILT_ROTATE_DEG_ANGLE } from "./const";
import { degToRad } from "../../utils";


const RadialElementContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  transform-origin: ${({theme}) => theme.circleItemSize / 2}px;

  > span {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out 0.6s;
    color: ${({theme}) => theme.color.text.primary};
    font-weight: 500;
  }

  > button {
    width: ${({theme}) => theme.circleItemSize}px;
    height: ${({theme}) => theme.circleItemSize}px;
    border-radius: 50%;
    border: 1px solid #303e5850;
    background: ${({theme}) => theme.color.text.primary};
    scale: 0.15;
    transition: scale 0.5s ease, background 0.3s ease;

    &:hover,
    &:focus {
      scale: 1;
      background: #f4f5f9;
    }
  }
`;


const EventTypeRadialElement = styled.div<IEventTypeButtonProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  transition: transform 0.6s ease-in-out;

  ${({ $activeIndex, $elementIndex, $elementsCount, $startAngleDeg = DEFAUILT_ROTATE_DEG_ANGLE, theme }) => {
    const startAngleRad = degToRad($startAngleDeg);
    const step = (2 * Math.PI) / $elementsCount;

    const rotateRad =
      step * ($elementIndex - $activeIndex) - startAngleRad;

    const isActive = $activeIndex === $elementIndex;

    return `
      transform:
        rotate(${rotateRad}rad)
        translateX(${theme.circleRadius / 2}px);

      ${RadialElementContentContainer} {
        transform: translate(${-theme.circleItemSize / 2}px, ${-theme.circleItemSize / 2}px) rotate(${-rotateRad}rad);
      }
      ${isActive && `
        ${RadialElementContentContainer} > button {
          scale: 1;
          background: #F4F5F9;
        }

        ${RadialElementContentContainer} > span {
          opacity: 1;
          visibility: visible;
        }
      `}
    `;
  }}
`;

export {
  RadialElementContentContainer,
  EventTypeRadialElement
};