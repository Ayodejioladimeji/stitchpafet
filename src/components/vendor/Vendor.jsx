import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//
import ProductCard from "../../common/productcard/ProductCard";
import Loading from "../../common/alert/Loading";
import LoadMore from "../../common/loadmore/LoadMore";
import { sortValue } from "../../utils/utils";

const Vendor = () => {
  const { all_product } = useSelector((state) => state.product);
  const { alert } = useSelector((state) => state);
  const history = useHistory();
  const [visible, setVisible] = useState(18);
  const [load, setLoad] = useState(false);
  const [sorting, setSorting] = useState("");
  const { vendor } = useParams();

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 6);
      setLoad(false);
    }, 2000);
  };

  const vendorProduct = all_product.filter((item) => item.vendor === vendor);

  //handlesorting method
  const handleSorting = (e) => {
    setSorting(e.target.value);
  };

  const sorted = sortValue(vendorProduct, sorting);
  //

  return (
    <div className="vendor-search">
      {/* <Search /> */}

      <div className="vendor-brand">
        <div className="vendor-brand-logo">
          <img src="/assets/vendor-logo.png" alt="" />
        </div>

        <div className="vendor-brand-text">
          <h1>Layo Stores</h1>
          <small>We deliver the best</small>
          <small>22 Akowonjo street, Lagos Nigeria.</small>
        </div>
      </div>

      <div className="vendor-search-div">
        <div className="vendor-search-top">
          <div className="search-back">
            <FaChevronLeft
              className="chevron-left"
              onClick={() => history.push("/market")}
            />
            <h1>{vendor}</h1>
          </div>

          {!alert.loading && (
            <div>
              Showing{" "}
              {visible > vendorProduct.length ? vendorProduct.length : visible}{" "}
              items
            </div>
          )}

          <div className="filter">
            <select onChange={handleSorting} value={sorting}>
              <option value="0">Sort by</option>
              <option value="1">Price: Low-High</option>
              <option value="2">Price: High-Low</option>
              <option value="3">Product rating</option>
            </select>
          </div>
        </div>

        {alert.loading ? (
          <div className="middle-loader">
            <Loading width="20px" height="20px" color="#fff" />
          </div>
        ) : (
          <div className="vendor-search-bottom">
            {sorted.slice(0, visible).map((item) => (
              <ProductCard key={item._id} {...item} />
            ))}
          </div>
        )}

        {/* {vendorProduct?.length === 0 && !alert.loading ? (
          <p className='text-center'>No products found</p>
        ) : (
          ''
        )} */}
      </div>

      {visible > vendorProduct?.length ? (
        ""
      ) : (
        <>{!alert.loading && <LoadMore load={load} showItems={showItems} />}</>
      )}
    </div>
  );
};

export default Vendor;
