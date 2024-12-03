// import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay } from "swiper/modules";

import Img1 from "../../assets/img/HeroSlider/1.jpg";
import Img2 from "../../assets/img/HeroSlider/2.jpg";
import Img3 from "../../assets/img/HeroSlider/3.jpg";

import Hotel from "../../assets/img/hotel.svg";
import Bed from "../../assets/img/bed.svg";
import Amenitities from "../../assets/img/amenitities.svg";
import Contact from "../../assets/img/contact.svg";

import { FaHotel, FaSwimmingPool, FaHeadset, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Your Luxury Hotel For Vacation",
    bg: Img1,
    btnText: "See our rooms",
  },
  {
    title: "Your Luxury Hotel For Vacation",
    bg: Img2,
    btnText: "See our rooms",
  },
  {
    title: "Your Luxury Hotel For Vacation",
    bg: Img3,
    btnText: "See our rooms",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[600px] lg:h-[860px]"
    >
      {slides.map((slide, index) => {
        const { title, bg, btnText } = slide;

        return (
          <SwiperSlide
            key={index}
            className="h-full relative flex justify-center items-center"
          >
            <div className="z-20 text-white text-center">
              <div className="uppercase font-tertiary tracking-[6px] mb-5">
                Just Enjoy and relax
              </div>

              <h1
                className="text-[32px] font-primary uppercase tracking-[2px]
              max-w-[920px] lg:text-[68px] leading-tight mb-6"
              >
                {title}
              </h1>

              <Link to="/rooms" className="btn btn-lg btn-primary mx-auto w-48">
                {btnText}
              </Link>
            </div>

            <div className="absolute top-0 w-full h-full">
              <img
                src={bg}
                alt="slide"
                className="object-cover h-full w-full"
              />
            </div>

            <div className="absolute w-full h-full bg-black/70"></div>

            <div
              className="container  flex flex-row justify-between absolute uppercase font-tertiary tracking-[6px] mt-8
            text-white text-center bottom-14"
            >
              <div className="flex flex-col justify-center items-center">
                <img src={Hotel} className="size-24 py-4" />
                <div className="hidden md:block">about the hotel</div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <img src={Bed} className="size-24 py-4" />
                <div className="hidden md:block">accommodations</div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <img src={Amenitities} className="size-24 py-4" />
                <div className="hidden md:block">amenities</div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <img src={Contact} className="size-24 py-4" />
                <div className="hidden md:block">contact</div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
