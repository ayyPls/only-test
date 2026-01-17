import './App.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { CircleButton } from './styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EVENTS } from './shared/const/events';
import gsap from 'gsap';
import { PageHeading } from './shared/ui/page-heading';


const UNIOQUE_EVENT_TYPES = EVENTS.reduce<Array<string>>((acc, item) => {
  if (!acc.includes(item.type)) {
    acc.push(item.type)
  }
  return acc
}, [])

const YearDigit = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.to(ref.current, {
      y: `-${value * 10}%`,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [value]);

  return (
    <span className="digit">
      <span ref={ref} className="digit-stack">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );
};

const EventYear = ({ year }: { year: number }) => {
  const digits = String(year).padStart(4, "0").split("");

  return (
    <div className="year">
      {digits.map((d, i) => (
        <YearDigit key={i} value={Number(d)} />
      ))}
    </div>
  );
};

// TODO: app theme
const App = () => {
  const [activeEventTypeIndex, setActiveEventTypeIndex] = useState(0)
  const filteredEventsByType = useMemo(() => {
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
      <PageHeading>Исторические <br />даты</PageHeading>

      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', position: 'relative', minHeight: '100vh' }}>
        {/* TODO: research how to make it not appear in robots.txt? mark it as a decorative element */}
        {/* TODO: set elements size to layout size and make it not break on elements add on page */}

        {/* TODO: circle border should be above circle text */}
        <div className='circle'>
          <div className='years-text'>
            <mark><EventYear year={filteredEventsByType[0].datetime.getFullYear()} /></mark>
            &nbsp;&nbsp;
            <mark><EventYear year={filteredEventsByType[filteredEventsByType.length - 1].datetime.getFullYear()} /></mark>
          </div>
          <div className='circle-items'>
            {
              // TODO: can you handle key param indide child react component instead of passing another param?
              // TODO: render event type name
              UNIOQUE_EVENT_TYPES.map((item, index, array) => (
                // TODO: refactor component
                <div key={index} style={{ display: 'flex', gap: 20 }}>
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
                  <div className='active-item-text'>{item}</div>
                </div>
              )
              )
            }
          </div>
        </div>
        <div className='line-horizontal' />

        <div className='circle-action-buttons'>
          <span>{`0${activeEventTypeIndex + 1}/0${UNIOQUE_EVENT_TYPES.length}`}</span>
          <div>
            <button disabled={activeEventTypeIndex === 0} type='button' onClick={handleClickPrevEventType}>
              <img src='/assets/arrow.svg' alt='left arrow' />
            </button>
            <button disabled={activeEventTypeIndex === UNIOQUE_EVENT_TYPES.length - 1} type='button' onClick={handleClickNextEventType}>
              <img src='/assets/arrow.svg' alt='right arrow' />
            </button>
          </div>
        </div>

        <div className='swiper-container'>
          {/* TODO: add navigation buttons */}
          <Swiper slidesPerView={3} spaceBetween={80} modules={[Navigation]}>
            {
              filteredEventsByType.map((event, index) => {
                return event.type === UNIOQUE_EVENT_TYPES[activeEventTypeIndex] ?
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
        <div className='line-vertical' />

      </div>
    </div>
  );
}

export default App;
