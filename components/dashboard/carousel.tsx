import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function Carousel(props: any) {
  return (
    <>
      <div className="w-[550px] border">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className="h-[400px] w-full"
        >
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center relative h-full w-full bg-slate-700 rounded">
              <img src="/slideshow/photo1.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center relative h-full w-full bg-slate-700 rounded">
              <img src="/slideshow/photo2.jpg" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center relative h-full w-full bg-slate-700 rounded">
              <img src="/slideshow/photo3.jpg" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
