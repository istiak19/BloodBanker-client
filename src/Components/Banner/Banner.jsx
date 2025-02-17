import Slide from "../Slide/Slide";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import banner1 from '../../assets/banner/banner-1.jpg'
import banner2 from '../../assets/banner/banner-2.jpg'
import banner3 from '../../assets/banner/banner-3.jpg'

const Banner = () => {
    return (
        <div className="">
            <Swiper
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide
                        image={banner1}
                        text="Give Blood, Save Lives: Every Drop Counts"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={banner2}
                        text="Join the Community of Life Savers Today"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={banner3}
                        text="Your Donation is Someone Hope for Tomorrow"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;