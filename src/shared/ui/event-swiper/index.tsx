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
import styled from "styled-components"


const SwiperNextSlideButton = () => {
    const swiper = useSwiper()
    return <button type="button" className="next-slide-button" onClick={() => swiper.slideNext()}>
            <SwiperArrowIcon color="#3877EE" />
        </button>
}

const SwiperContainer = styled.div`
    cursor: grab;
    padding: 3rem 40px 0 80px;
    // thumbs
    >.thumbs-swiper {
        display: none;
        width: fit-content;
        margin: 0 auto;
    }
    @media(max-width: 768px) {
        padding: 0;
        padding-top: 20px;

        >.thumbs-swiper {
            display: block;
            margin-top: 103px;
        }
    }
`

const EventSwiperSlide = styled(SwiperSlide)`
    display: flex;
    flex-direction: column;
    gap: 15px;
    h2 {
        font-family: ${({theme}) => theme.fonts.secondary};
        font-style: normal;
        color: ${({theme}) => theme.color.text.secondary};
        line-height: 120%;
        font-size: 25px;
        margin: 0;
    }
    p {
        color: ${({theme}) => theme.color.text.primary};
        font-size: 20px;
        line-height: 30px;
        margin: 0;
        /* NOTE: in case if swiper slide description needs to be truncated */
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // overflow: hidden;
    }

    @media (max-width: 768px) {
        h2 {
            font-weight: normal;
            font-size: 16px;
        }
        p {
            font-size: 14px;
            line-height: 145%;
        }
    }
`

const SWIPER_SLIDES_PER_VIEW = 3
const EventSwiper: FC<IEventSwiperProps> = ({ events }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperEvent | null>(null)
    const [isReachedEnd, setIsReachedEnd] = useState(false)

    const handleSlideChange = (event: SwiperEvent) => {
        setIsReachedEnd(event.isEnd)
    }

    return <SwiperContainer className="swiper-container">
        <Swiper className="events-swiper" modules={[Thumbs]} thumbs={{swiper: thumbsSwiper }} breakpoints={{
            0: {
                slidesPerView: 1,
                spaceBetween: 25,
                slidePrevClass: 'prev-slide-class',
                slideNextClass: "next-slide-class",
            },
            768: {
                slidesPerView: SWIPER_SLIDES_PER_VIEW,
                spaceBetween: 80,
                slidesOffsetAfter: 80,
            }
        }} onSlideChange={handleSlideChange}>
            {
                events.map(({ description, datetime }, index) => (
                    <EventSwiperSlide key={index}>
                        <h2>{datetime.getFullYear()}</h2>
                        <p>{description}</p>
                    </EventSwiperSlide>
                ))
            }
            {(isReachedEnd || events.length <= SWIPER_SLIDES_PER_VIEW) ? null : <SwiperNextSlideButton />}
        </Swiper>
        <Swiper
            className="thumbs-swiper"
            spaceBetween={10}
            slidesPerView={"auto"}
            slideToClickedSlide
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
        >
            {events.map((_thumb, index) => <SwiperSlide key={index} />)}
        </Swiper>
    </SwiperContainer>
}

export { EventSwiper }