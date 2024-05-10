import React from "react";
import Goback from "../../common/goback/Goback";

//

const ProductHeros = () => {
  return (
    <div className="product-heros">
      <div className="product-hero-banner">
        <img src="/assets/banner-one.jpeg" alt="" />
      </div>

      <Goback />

      {/* <div className='product-heros-one'>
        <img src='/assets/watch_2.png' alt='' />
      </div>

      <div className='product-heros-two '>
        <h3>Explore New Collections</h3>
        <h1>Shop wise with price comparisons </h1>
        <button>View Collections</button>
      </div>

      <div className='product-heros-three'>
        <img src='/assets/speaker_2.png' alt='' />
      </div> */}
    </div>
  );
};

export default ProductHeros;
