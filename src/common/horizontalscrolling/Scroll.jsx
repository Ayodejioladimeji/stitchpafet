import React from "react";
import { Carousel } from "react-responsive-carousel";

// import images
import dress from "/images/dress.svg";
import jacket from "/images/jacket.svg";

const imgs = [dress, jacket];

const Scroll = () => {
  const imgsrow = imgs?.map((img, index) => {
    return (
      <div style={{ background: "orange" }} key={index}>
        {/* <SideBySideMagnifier
          alwaysInPlace={true}
          imageSrc={dress}
          interactionSettings={{ tapDurationInMs: 300 }}
        /> */}
        <img src={img} alt="" />
      </div>
    );
  });

  return (
    <div className="imgwrapper">
      <Carousel
        showArrows={false}
        showIndicators={false}
        infiniteLoop
        swipeable={true}
      >
        {imgsrow}
      </Carousel>
    </div>
  );
};
export default Scroll;
