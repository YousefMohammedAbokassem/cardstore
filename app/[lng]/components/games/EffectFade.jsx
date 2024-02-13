"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// import "./styles.css";

// import required modules
import { Autoplay, EffectFade } from "swiper/modules";
import { ADSAPI, LOCALAPI } from "../lib/apis";
import Ads from "../lib/Ads";

export default function App() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAPi = async () => {
    try {
      // const res = await axios.get(`${ADSAPI}`);
      const res = await Ads();
      setAds(res.data);
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAPi();
  }, []);
  return (
    <div className="mb-4 sliderEffect mx-4 h-32 md:h-40 lg:h-52">
      {loading ? (
        <div
          role="status"
          className="space-y-8 h-full animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex  items-center justify-center h-full w-full bg-gray-300 dark:bg-[#33373b] rounded">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-[#4d4d4d]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          {/* <div class="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div> */}
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          touchAngle={false}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className="mySwiper h-full"
        >
          {ads?.map((ad) => {
            return (
              <SwiperSlide key={ad.id}>
                <img src={`${LOCALAPI}${ad.file_url}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
