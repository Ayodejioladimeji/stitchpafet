import React from 'react';
import Card from '../../common/card/Card';
import LoadMore from '../../common/loadmore/LoadMore';
import { data } from '@/constants/SecureData';

const AllProducts = () => {
  return (
    <div className="all-products">
      <div className="product-box">
        {data?.map((item, key) => (
          <Card item={item} key={key} />
        ))}
      </div>

      <LoadMore load={false} showItems="" />
    </div>
  );
};

export default AllProducts;
