import { useCallback, useMemo, useState } from 'react';
import { PageHeading, PageContentContainer, EventSwiper, EventDateRange } from '../shared/ui';
import { EventTypeSwitch } from '../widgets';
import { EVENTS } from '../shared/const';
import { ThemeProvider } from 'styled-components';
import { AppTheme } from './theme';
import './index.css';

const UNIOQUE_EVENT_TYPES = EVENTS.reduce<Array<string>>((acc, item) => {
  if (!acc.includes(item.type)) {
    acc.push(item.type)
  }
  return acc
}, [])

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
    <ThemeProvider theme={AppTheme}>
      <main>
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
          <EventSwiper events={groupedEventsByType} />
        </PageContentContainer>
      </main>
    </ThemeProvider>
  );
}

export default App;
