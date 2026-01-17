import { FC, useState } from "react"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import SwiperArrowIcon from "../icons/swiper-arrow"
import { IEventSwiperProps } from "./interface"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import SwiperEvent from "swiper"


const SwiperNextSlideButton = () => {
    const swiper = useSwiper()
    // console.log(swiper.activeIndex)
    return <button type="button" className="next-slide-button" onClick={() => swiper.slideNext()}>
        <SwiperArrowIcon color="#3877EE" />
    </button>
}

{/* TODO: add navigation buttons */ }
const SWIPER_SLIDES_PER_VIEW = 3
const EventSwiper: FC<IEventSwiperProps> = ({ events }) => {
    const [isReachedEnd, setIsReachedEnd] = useState(false)
    const handleSlideChange = (event: SwiperEvent) => {
        setIsReachedEnd(event.isEnd)
    }
    return <div className="swiper-container">
        <Swiper slidesPerView={SWIPER_SLIDES_PER_VIEW} spaceBetween={80} onSlideChange={handleSlideChange}>
            {
                events.map(({ description, datetime }, index) => (
                    // TODO: figure out slide sizes
                    <SwiperSlide className="swiper-slide-card" key={index}>
                        <h2 className='title'>{datetime.getFullYear()}</h2>
                        <p className='description'>{description}</p>
                    </SwiperSlide>
                ))
            }
            {/* TODO: fix button placement */}
            <span className="swiper-wrappen-end" slot="wrapper-end"></span>
            {(isReachedEnd || events.length <= SWIPER_SLIDES_PER_VIEW) ? null : <SwiperNextSlideButton />}

            {/* TODO: swiper thumbs on mobile */}
        </Swiper>
    </div>
}

export { EventSwiper }