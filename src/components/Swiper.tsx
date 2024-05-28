import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/constants/testimonials';


export default () => {

    // 
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={5}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log("")}
            onSlideChange={(item) => console.log(item.realIndex)}
        >
            {testimonials?.map((item, key) => <SwiperSlide key={key} >
                <TestimonialCard {...item} index={key} />
            </SwiperSlide>)}
        </Swiper>
    );
};