import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { GiLargeDress } from 'react-icons/gi';

//
import ProductCard from '../../common/productcard/ProductCard';
import LoadMore from './../../common/loadmore/LoadMore';

//
const NewArrivals = () => {
  const { all_product } = useSelector((state) => state.product);
  const [visible, setVisible] = useState(12);
  const [load, setLoad] = useState(false);

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 6);
      setLoad(false);
    }, 2000);
  };

  const fashion = all_product.filter(
    (item) => item.categories === '62e02ba4832770b3cf617b09'
  );

  return (
    <div className='new-arrivals'>
      <div className='new-arrivals-header'>
        <GiLargeDress className='market-icon' />
        <div className='header'>Fashion</div>
      </div>

      {alert.loading ? (
        'loading...'
      ) : (
        <div className='new-arrivals-bottom'>
          {fashion?.slice(0, visible).map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })}
        </div>
      )}

      {visible > fashion.length ? (
        ''
      ) : (
        <LoadMore load={load} showItems={showItems} />
      )}
    </div>
  );
};

export default NewArrivals;
