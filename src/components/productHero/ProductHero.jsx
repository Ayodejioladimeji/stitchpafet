import React from 'react';

const ProductHero = () => {
  return (
    <div className='product-hero'>
      <div className='product-hero-one'>
        <div className='product-hero-one-top products-advert'>
          <img src='/assets/products/advert-six.jpg' alt='' />
        </div>
        <div className='product-hero-one-bottom products-advert'>
          <img src='/assets/products/advert-eight.png' alt='' />
        </div>
      </div>

      <div className='product-hero-two '>
        {' '}
        <img src='/assets/products/advert-main.gif' alt='' />
      </div>

      <div className='product-hero-three'>
        <div className='product-hero-three-top products-advert'>
          <img src='/assets/products/advert-nine.png' alt='' />
        </div>
        <div className='product-hero-three-bottom products-advert'>
          <img src='/assets/products/advert-ten.png' alt='' />
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
