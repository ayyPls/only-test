import { FC } from "react"
import { EventTypeRadialElement, RadialElementContentContainer } from "../../shared/ui"
import { IEventTypeSwitchProps } from "./interface"
import EventTypeArrowNext from "../../shared/ui/icons/event-type-arrow-next"
import styled from "styled-components"


const EventTypeSwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({theme}) => theme.circleRadius}px;
  height: ${({theme}) => theme.circleRadius}px;
  border-radius: 100%;
  border: 1px solid #E3E6ED;
  position: relative;
  margin: 0 auto;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 56px 0;
    border: none;
    border-bottom: 1px solid #C7CDD9;
    border-radius: 0;
    width: 100%;
    height: auto;
  }
`

const EventTypeSwitchItemsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    button {
      display: none;
    }
  
    ${EventTypeRadialElement} {
      transform: none;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: flex-end;
      font-size: 1rem;
      font-weight: bold;
    }

    ${RadialElementContentContainer} {
        transform: none !important;
        span {
            font-size: 16px;
            font-weight: bold;  
        }
    }
  }
`

const LineHorizontal = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid #E3E6ED;
  bottom: calc(${({theme}) => theme.circleRadius}px / 2);
  @media(max-width: 768px) {
      display: none;
  }
`

const LineVertical = styled.div`
  position: absolute;
  min-height: 100%;
  border-right: 1px solid #E3E6ED;
  left: 50%;
  top: 0;
  @media(max-width: 768px) {
    display: none;
  }
`

const EventTypeActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: flex-start;
  gap: 20px;
  padding-left: 80px;
  margin-top: calc(-48px);

  span {
    line-height: auto;
    font-size: 14px;
    color: #42567A;
    height: 18px;
  }
  @media(max-width: 768px) {
    left: 0;
    bottom: -19px;
    padding: 0;
    position: absolute;
    gap: 11px;
  }
`

const EventTypeActionButtonsContainer = styled.div`
  display: flex;
  gap: 20px;

  button:disabled {
    opacity: 0.5;
  }
  button:last-child {
    transform: rotate(180deg);
  }

  @media (max-width: 768px) {
    gap: 8px;

    button {
        width: 25px;
        height: 25px;

        svg {
            scale: .5;
        }
    }
  }
`

const EventTypeSwitch: FC<IEventTypeSwitchProps> = ({ eventTypes, activeEventTypeIndex, children, onClickEventType, onClickPrevEventType, onClickNextEventType }) => {
    return <>
        <EventTypeSwitchContainer>
            {children}
            <EventTypeSwitchItemsContainer>
                {
                    eventTypes.map((item, index, array) => (
                        <EventTypeRadialElement
                            key={index}
                            $activeIndex={activeEventTypeIndex}
                            $elementIndex={index}
                            $elementsCount={array.length}
                        >
                            <RadialElementContentContainer>
                                <button onClick={() => onClickEventType(index)}>{index + 1}</button>
                                <span>{item}</span>
                            </RadialElementContentContainer>
                        </EventTypeRadialElement>
                    )
                    )
                }
            </EventTypeSwitchItemsContainer>
        </EventTypeSwitchContainer>
        <LineHorizontal />
        <LineVertical />
        <EventTypeActionsContainer className="circle-action-buttons">
            {/* NOTE: this is ok until length of event types is in range [2...10] */}
            <span>{`0${activeEventTypeIndex + 1}/0${eventTypes.length}`}</span>
            <EventTypeActionButtonsContainer>
                <button disabled={activeEventTypeIndex === 0} type='button' onClick={onClickPrevEventType}>
                    <EventTypeArrowNext />
                </button>
                <button disabled={activeEventTypeIndex === eventTypes.length - 1} type='button' onClick={onClickNextEventType}>
                    <EventTypeArrowNext />
                </button>
            </EventTypeActionButtonsContainer>
        </EventTypeActionsContainer>
    </>
}

export { EventTypeSwitch }