import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules'; // Import Autoplay module

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { images } from "@/constants/images";

const Hero = () => {
  const { token } = useSelector((state: any) => state.auth);
  const router = useRouter();

  return (
    <div className="hero container">
      <div className="row">
        <div className="col-6">
          <div className="hero-left ">
            <div className="hero-left-div">
              <h1 className="escrow" data-aos="fade-up" data-aos-once="true">
                Exquisite and <span>Quality Materials</span> just for you.
              </h1>
              <p>
                Our carefully curated collection of clothing is designed and
                produced by talented artisans from our community, bringing you
                unique styles that are made with love and dedication.
              </p>

              <div
                className="hero-buttons"
                data-aos="fade-down"
                data-aos-once="true"
              >
                <button onClick={() => router.push("/products")}>
                  View Products
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero right */}
        <div className="col-6">
          <div className="hero-right ">
            <Swiper
              // Install Swiper modules
              modules={[Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={1}
              slidesPerView={1}
              // pagination={{ clickable: false }}
              onSwiper={(swiper) => console.log("")}
              // onSlideChange={(item) => console.log(item.realIndex)}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={5000}
            >
              {images?.map((item, key) => (
                <SwiperSlide key={key}>
                  <div className="image-box">
                    <Image
                      height={100}
                      width={100}
                      unoptimized
                      src={item.image}
                      alt="Image 1"
                      className="image1"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
