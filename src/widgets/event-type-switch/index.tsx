import { FC } from "react"
import { EventTypeButton } from "../../shared/ui"
import { IEventTypeSwitchProps } from "./interface"


const EventTypeSwitch: FC<IEventTypeSwitchProps> = ({ eventTypes, activeEventTypeIndex, children, onClickEventType, onClickPrevEventType, onClickNextEventType }) => {
    return <>
        {/* TODO: circle border should be above circle text */}
        <div className='circle'>
            {children}
            <div className='circle-items'>
                {
                    eventTypes.map((item, index, array) => (
                        // TODO: refactor component
                        <div key={index} style={{ display: 'flex', gap: 20 }}>
                            <EventTypeButton
                                type='button'
                                onClick={() => onClickEventType(index)}
                                // TODO: fix error with html-attribute
                                activeIndex={activeEventTypeIndex}
                                key={index}
                                index={index}
                                length={array.length}
                            >
                                <span>{index + 1}</span>
                            </EventTypeButton>
                            {/* TODO: style event type name styles */}
                            <div className='active-item-text'>{item}</div>
                        </div>
                    )
                    )
                }
            </div>
        </div>
        <div className='line-horizontal' />
        <div className='line-vertical' />
        <div className='circle-action-buttons'>
            <span>{`0${activeEventTypeIndex + 1}/0${eventTypes.length}`}</span>
            <div>
                <button disabled={activeEventTypeIndex === 0} type='button' onClick={onClickPrevEventType}>
                    <img src='/assets/arrow.svg' alt='left arrow' />
                </button>
                <button disabled={activeEventTypeIndex === eventTypes.length - 1} type='button' onClick={onClickNextEventType}>
                    <img src='/assets/arrow.svg' alt='right arrow' />
                </button>
            </div>
        </div>
    </>
}

export { EventTypeSwitch }