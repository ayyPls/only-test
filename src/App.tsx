import './App.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { CircleButton } from './styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useCallback, useMemo, useState } from 'react';

const EVENTS = [
  {
    datetime: new Date('2013-09-13'),
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    type: "Наука"
  },
  {
    datetime: new Date('2016-04-01'),
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды 13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды 13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    type: "Наука"
  },
  {
    datetime: new Date('2020-07-20'),
    description: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
    type: "Наука"
  },
  {
    datetime: new Date('2022-01-01'),
    description: "",
    type: "Наука"
  },
  {
    datetime: new Date('2023-01-01'),
    description: "",
    type: "2"
  },
]

const CIRCLE_ITEMS_UNIQUE = EVENTS.reduce<Array<string>>((acc, item) => {
  if (acc.includes(item.type)) {
    return acc
  }
  else acc.push(item.type)
  return acc
}, [])

// TODO: app theme
const App = () => {
  const [activeEventTypeIndex, setActiveEventTypeIndex] = useState(0)
  const filteredEventsByType = useMemo(() => {
    return EVENTS.filter(event => event.type === CIRCLE_ITEMS_UNIQUE[activeEventTypeIndex])
      .sort((a, b) => a.datetime > b.datetime ? 1 : -1)
  }, [activeEventTypeIndex])

  const handleClickEventType = useCallback((index: number) => {
    setActiveEventTypeIndex(index)
  }, [])

  const handleClickNextEventType = useCallback(() => {
    setActiveEventTypeIndex((prevIndex) => (prevIndex + 1) % CIRCLE_ITEMS_UNIQUE.length)
  }, [])

  const handleClickPrevEventType = useCallback(() => {
    setActiveEventTypeIndex((prevIndex) => (prevIndex - 1 + CIRCLE_ITEMS_UNIQUE.length) % CIRCLE_ITEMS_UNIQUE.length)
  }, [])

  return (
    // TODO: adaptive layout
    // TODO: container should not count border width as container width 
    <div className="layout" style={{ margin: "0 160px 0 320px", borderLeft: '1px solid #E3E6ED', borderRight: '1px solid #E3E6ED', height: '100vh' }}>
      {/* <div className='line' style={{border: '1px solid #E3E6ED', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(calc(-50% + 80px), -50%)'}}/> */}
      <div style={{ width: '100%', height: '100%' }}>
        {/* TODO: look for a css way to do line break */}
        <h1>Исторические <br />даты</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          {/* TODO: research how to make it not appear in robots.txt? mark it as a decorative element */}
          {/* TODO: set elements size to layout size and make it not break on elements add on page */}

          {/* TODO: style as circle items to center correctly */}

          {/* TODO: circle border should be above circle text */}
          <div className='circle'>
            {/* <div className='line' style={{ zIndex: -1, border: '1px solid #E3E6ED', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(calc(-50% + 80px), -50%)' }} /> */}
            <div className='line-vertical' />
            {/* <div className='line' style={{ zIndex: -1, border: '1px solid #E3E6ED', width: '100%', position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)' }} /> */}
            <p className='years-text' >
              {/* TODO: numbers counter animation */}
              <mark>2015</mark>&nbsp;&nbsp;<mark>2022</mark>
            </p>
            <div className='circle-items'>
              {
                // TODO: can you handle key param indide child react component instead of passing another param?
                // TODO: render event type name
                CIRCLE_ITEMS_UNIQUE.map((item, index, array) => (
                  <CircleButton
                    type='button'
                    onClick={() => handleClickEventType(index)}
                    activeIndex={activeEventTypeIndex}
                    key={index}
                    index={index}
                    length={array.length}
                  >
                    <span>{index + 1}</span>
                  </CircleButton>
                )
                )
              }
            </div>
          </div>
          <div className='circle-action-buttons'>
            <span>{`0${activeEventTypeIndex + 1}/0${CIRCLE_ITEMS_UNIQUE.length}`}</span>
            <div>
              <button disabled={activeEventTypeIndex === CIRCLE_ITEMS_UNIQUE.length - 1 || activeEventTypeIndex === 0} type='button' onClick={handleClickPrevEventType}>
                <img src='/assets/arrow.svg' alt='left arrow' />
              </button>
              <button disabled={activeEventTypeIndex === CIRCLE_ITEMS_UNIQUE.length - 1 || activeEventTypeIndex === 0} type='button' onClick={handleClickNextEventType}>
                <img src='/assets/arrow.svg' alt='right arrow' />
              </button>
            </div>
          </div>
        </div>
        <div className='swiper-container'>
          {/* TODO: add navigation buttons */}
          <Swiper slidesPerView={3} spaceBetween={80} modules={[Navigation]}>
            {
              filteredEventsByType.map((event, index) => {
                return event.type === CIRCLE_ITEMS_UNIQUE[activeEventTypeIndex] ?
                  <SwiperSlide key={index}>
                    <div className='swiper-slide-card'>
                      <h2 className='title'>{event.datetime.getFullYear()}</h2>
                      <p className='description'>{event.description}</p>
                    </div>
                  </SwiperSlide> : null
              }
              )
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default App;
