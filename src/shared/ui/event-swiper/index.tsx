import { FC, useState } from "react"
import SwiperEvent from "swiper"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import { Thumbs } from "swiper/modules"
import SwiperArrowIcon from "../icons/swiper-arrow-next"
import { IEventSwiperProps } from "./interface"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'


const SwiperNextSlideButton = () => {
    const swiper = useSwiper()
    return <button type="button" className="next-slide-button" onClick={() => swiper.slideNext()}>
        <SwiperArrowIcon color="#3877EE" />
    </button>
}

const SWIPER_SLIDES_PER_VIEW = 3
const EventSwiper: FC<IEventSwiperProps> = ({ events }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperEvent | null>(null)
    const [isReachedEnd, setIsReachedEnd] = useState(false)

    const handleSlideChange = (event: SwiperEvent) => {
        setIsReachedEnd(event.isEnd)
    }
    return <div className="swiper-container">
        <Swiper modules={[Thumbs]} thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}} breakpoints={{
            0: {
                slidesPerView: 1.5,
                spaceBetween: 25,
                slidePrevClass: 'prev-slide-class',
                slideNextClass: "next-slide-class",
                slidesOffsetAfter: 0,
            },
            768: {
                slidesPerView: SWIPER_SLIDES_PER_VIEW,
                spaceBetween: 80,
                slidesOffsetAfter: 80,
            }
        }} onSlideChange={handleSlideChange}>
            {
                events.map(({ description, datetime }, index) => (
                    // TODO: figure out slide sizes
                    <SwiperSlide className="swiper-slide-card" key={index}>
                        <h2 className='title'>{datetime.getFullYear()}</h2>
                        <p className='description'>{description}</p>
                    </SwiperSlide>
                ))
            }
            {(isReachedEnd || events.length <= SWIPER_SLIDES_PER_VIEW) ? null : <SwiperNextSlideButton />}
        </Swiper>
        <Swiper
            // slideToClickedSlide
            spaceBetween={10}
            slidesPerView={"auto"}
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
        >
            {events.map((_thumb, index) => (
                <SwiperSlide className="thumb-item" key={index} />
            ))}
        </Swiper>
    </div>
}

export { EventSwiper }