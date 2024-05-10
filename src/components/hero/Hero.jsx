import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();

  return (
    <div className="hero">
      {/* Hero left */}
      <div className="hero-left">
        <div className="hero-left-div">
          <h1 className="escrow" data-aos="fade-up" data-aos-once="true">
            Exquisite and quality Materials just for you
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
            <button onClick={() => router.push("/market")}>
              View Products
            </button>
          </div>
        </div>
      </div>

      {/* Hero right */}
      <div className="hero-right">
        <div className="image-grid">
          <div className="image-box">
            <Image
              height={100}
              width={100}
              unoptimized
              src="/images/four.jpeg"
              alt="Image 1"
              className="image1"
            />
          </div>

          <div className="image-box">
            <Image
              height={100}
              width={100}
              unoptimized
              src="/images/two.jpeg"
              alt="Image 2"
              className="image2"
            />
          </div>

          <div className="image-box">
            <Image
              height={100}
              width={100}
              unoptimized
              src="/images/six.jpeg"
              alt="Image 2"
              className="image2"
            />
          </div>

          <div className="image-box">
            <Image
              height={100}
              width={100}
              unoptimized
              src="/images/eight.jpeg"
              alt="Image 2"
              className="image2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;