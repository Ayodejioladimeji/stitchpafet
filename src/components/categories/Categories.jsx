import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";

//
import Search from "./../search/Search";
import ProductCard from "./../../common/productcard/ProductCard";
import LoadMore from "./../../common/loadmore/LoadMore";
import { all_product as AllProduct } from "./../../redux/actions/ProductAction";
import Loading from "./../../common/alert/Loading";
import { sortValue } from "./../../utils/utils";

//

const Categories = () => {
  const { all_product } = useSelector((state) => state.product);
  const { cat } = useSelector((state) => state.auth);
  const { callback } = useSelector((state) => state.dashboard);
  const { alert } = useSelector((state) => state);
  const [heading, setHeading] = useState("");
  const { params } = useParams();
  const history = useHistory();
  const [visible, setVisible] = useState(18);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState("");

  // Get all products
  useEffect(() => {
    dispatch(AllProduct());
    setVisible(18);
  }, [dispatch, callback]);

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 6);
      setLoad(false);
    }, 2000);
  };

  const filtered = all_product.filter((item) => item.categories === cat);

  useEffect(() => {
    if (params) {
      const result = params.replace("-", " & ");
      setHeading(result);
    }
  }, [params]);

  //handlesorting method
  const handleSorting = (e) => {
    setSorting(e.target.value);
  };

  const sorted = sortValue(filtered, sorting);

  //

  return (
    <div className="categories">
      <div className="categories-banner">
        <img src="/assets/banner-two.jpeg" alt="" />
      </div>
      <Search />

      <div className="categories-div">
        <div className="categories-top">
          <div className="search-back">
            <FaChevronLeft
              className="chevron-left"
              onClick={() => history.push("/market")}
            />
            <h1>{heading}</h1>
          </div>

          {!alert.loading && (
            <div>
              Showing {visible > filtered.length ? filtered.length : visible}{" "}
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
          <div className="beneficiary-loading">
            <Loading width="25px" height="25px" color="#fff" />
          </div>
        ) : (
          <>
            {filtered?.length === 0 && !alert.loading ? (
              <p className="text-center">No products found</p>
            ) : (
              <div className="categories-bottom">
                {sorted?.slice(0, visible).map((item) => (
                  <ProductCard key={item._id} {...item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {visible > filtered.length ? (
        ""
      ) : (
        <>{!alert.loading && <LoadMore load={load} showItems={showItems} />}</>
      )}
    </div>
  );
};

export default Categories;
