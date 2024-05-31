import React from "react";

const DetailsThumb = ({ indexs, images, setIndex }) => {
  return (
    <div className="thumb">
      {images?.map((img, index) => (
        <img
          className={indexs === index ? "image-active" : ""}
          src={img.url}
          alt=""
          key={index}
          onClick={() => setIndex(index)}
        />
      ))}
    </div>
  );
};
export default DetailsThumb;
