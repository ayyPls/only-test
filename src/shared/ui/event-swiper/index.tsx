import { Swiper, SwiperSlide } from "swiper/react"
import { IHistoryEvent } from "../../interface"
import { FC } from "react"
import 'swiper/css';

interface IEventSwiperProps {
    events: Array<IHistoryEvent>
}

{/* TODO: add navigation buttons */ }
const EventSwiper: FC<IEventSwiperProps> = ({ events }) => {
    return <Swiper slidesPerView={3} spaceBetween={80}>
        {
            events.map(({ description, datetime }, index) => (
                <SwiperSlide className="swiper-slide-card" key={index}>
                    <h2 className='title'>{datetime.getFullYear()}</h2>
                    <p className='description'>{description}</p>
                </SwiperSlide>
            ))
        }
    </Swiper>
}

export { EventSwiper }