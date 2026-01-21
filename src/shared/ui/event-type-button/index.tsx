import styled from "styled-components";
import { IEventTypeButtonProps } from "./interface";
import { DEFAUILT_ROTATE_DEG_ANGLE } from "./const";
import { degToRad } from "../../utils";


const RadialElementContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  transform-origin: 28px;

  > span {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out 0.6s;
    color: #42567a;
    font-weight: 500;
  }

  > button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid #303e5850;
    background: #42567a;
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

  ${({ $activeIndex, $elementIndex, $elementsCount, $startAngleDeg = DEFAUILT_ROTATE_DEG_ANGLE }) => {
    const startAngleRad = degToRad($startAngleDeg);
    const step = (2 * Math.PI) / $elementsCount;

    const rotateRad =
      step * ($elementIndex - $activeIndex) - startAngleRad;

    const isActive = $activeIndex === $elementIndex;

    return `
      transform:
        rotate(${rotateRad}rad)
        translateX(265px);

      ${RadialElementContentContainer} {
        transform: translate(-28px, -28px) rotate(${-rotateRad}rad);
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