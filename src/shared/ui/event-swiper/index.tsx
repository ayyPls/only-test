import { FC } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { IEventSwiperProps } from "./interface";
import 'swiper/css';


{/* TODO: add navigation buttons */ }
const EventSwiper: FC<IEventSwiperProps> = ({ events }) => {
    return <div className="swiper-container">
        <Swiper slidesPerView={3} spaceBetween={80}>
            {
                events.map(({ description, datetime }, index) => (
                    <SwiperSlide className="swiper-slide-card" key={index}>
                        <h2 className='title'>{datetime.getFullYear()}</h2>
                        <p className='description'>{description}</p>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
}

export { EventSwiper }