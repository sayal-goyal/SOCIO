import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';

const Slider = () => {
    return (
        <div className='flex flex-col p-6 w-full bg-zinc-900 rounded-lg space-y-4'>
            <div className="text-2xl text-zinc-100">Top Features</div>
            <Swiper
                slidesPerView={1}
                spaceBetween={15}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Autoplay, Pagination]}
                className="w-full rounded-md"
            >
                <SwiperSlide><img className='w-full h-72 rounded-md' src="/img1.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-72 rounded-md' src="/img2.png" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-72 rounded-md' src="/img3.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-72 rounded-md' src="/img4.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-72 rounded-md' src="/img5.jpg" alt="" /></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slider;