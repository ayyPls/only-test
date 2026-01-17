import { useCallback, useMemo, useState } from 'react';
import { PageHeading, PageContentContainer, EventSwiper, EventDateRange } from './shared/ui';
import { EventTypeSwitch } from './widgets';
import { EVENTS } from './shared/const';
import './App.css';


const UNIOQUE_EVENT_TYPES = EVENTS.reduce<Array<string>>((acc, item) => {
  if (!acc.includes(item.type)) {
    acc.push(item.type)
  }
  return acc
}, [])

// TODO: app theme
const App = () => {
  const [activeEventTypeIndex, setActiveEventTypeIndex] = useState(0)
  const groupedEventsByType = useMemo(() => {
    return EVENTS.filter(event => event.type === UNIOQUE_EVENT_TYPES[activeEventTypeIndex])
      .sort((a, b) => a.datetime > b.datetime ? 1 : -1)
  }, [activeEventTypeIndex])

  const handleClickEventType = useCallback((index: number) => {
    setActiveEventTypeIndex(index)
  }, [])

  const handleClickNextEventType = useCallback(() => {
    setActiveEventTypeIndex((prevIndex) => (prevIndex + 1) % UNIOQUE_EVENT_TYPES.length)
  }, [])

  const handleClickPrevEventType = useCallback(() => {
    setActiveEventTypeIndex((prevIndex) => (prevIndex - 1 + UNIOQUE_EVENT_TYPES.length) % UNIOQUE_EVENT_TYPES.length)
  }, [])

  return (
    // TODO: adaptive layout
    // TODO: container should not count border width as container width
    <div className="layout">
      {/* TODO: look for a css way to do line break */}
      {/* <div style={{height: 200}}></div> */}
      <PageHeading>Исторические <br />даты</PageHeading>
      <PageContentContainer>
        <EventTypeSwitch
          eventTypes={UNIOQUE_EVENT_TYPES}
          activeEventTypeIndex={activeEventTypeIndex}
          onClickEventType={handleClickEventType}
          onClickNextEventType={handleClickNextEventType}
          onClickPrevEventType={handleClickPrevEventType}
        >
          <EventDateRange
            min={groupedEventsByType[0].datetime}
            max={groupedEventsByType[groupedEventsByType.length - 1].datetime}
          />
        </EventTypeSwitch>
        {/* TODO: add navigation buttons */}
        <EventSwiper events={groupedEventsByType} />
      </PageContentContainer>
    </div>
  );
}

export default App;
