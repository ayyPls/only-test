import { FC } from "react"
import { EventTypeRadialElement, RadialElementContentContainer } from "../../shared/ui"
import { IEventTypeSwitchProps } from "./interface"
import EventTypeArrowNext from "../../shared/ui/icons/event-type-arrow-next"


const EventTypeSwitch: FC<IEventTypeSwitchProps> = ({ eventTypes, activeEventTypeIndex, children, onClickEventType, onClickPrevEventType, onClickNextEventType }) => {
    return <>
        {/* TODO: circle border should be above circle text */}
        <div className='circle'>
            {children}
            <div className='circle-items'>
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
            </div>
        </div>
        <div className='line-horizontal' />
        <div className='line-vertical' />
        <div className='circle-action-buttons'>
            {/* NOTE: this is ok until length of event types is < 10 */}
            <span>{`0${activeEventTypeIndex + 1}/0${eventTypes.length}`}</span>
            {/* TODO: disabled button styles */}
            <div>
                <button disabled={activeEventTypeIndex === 0} type='button' onClick={onClickPrevEventType}>
                    <EventTypeArrowNext />
                </button>
                <button disabled={activeEventTypeIndex === eventTypes.length - 1} type='button' onClick={onClickNextEventType}>
                    <EventTypeArrowNext />
                </button>
            </div>
        </div>
    </>
}

export { EventTypeSwitch }