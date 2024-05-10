import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./../search/Search";
import ProductCard from "./../../common/productcard/ProductCard";
import Loading from "./../../common/alert/Loading";
import LoadMore from "./../../common/loadmore/LoadMore";
import { sortValue } from "./../../utils/utils";

const DisplaySearch = () => {
  const { search } = useSelector((state) => state.product);
  const { alert } = useSelector((state) => state);
  const history = useHistory();
  const [visible, setVisible] = useState(18);
  const [load, setLoad] = useState(false);
  const [sorting, setSorting] = useState("");

  const showItems = () => {
    setLoad(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 6);
      setLoad(false);
    }, 2000);
  };

  //handlesorting method
  const handleSorting = (e) => {
    setSorting(e.target.value);
  };

  const sorted = sortValue(search, sorting);
  //

  return (
    <div className="display-search">
      <div className="display-search-banner">
        <img src="/assets/banner-three.jpeg" alt="" />
      </div>
      <Search />

      <div className="display-search-div">
        <div className="display-search-top">
          <div className="search-back">
            <FaChevronLeft
              className="chevron-left"
              onClick={() => history.push("/market")}
            />
            <h1>Search results</h1>
          </div>

          {!alert.loading && (
            <div>
              Showing {visible > search ? search.length : visible} items
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
          <>
            {search?.length === 0 ? (
              <p className="text-center">No products found</p>
            ) : (
              <div className="display-search-bottom">
                {sorted.slice(0, visible).map((item) => (
                  <ProductCard key={item._id} {...item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {visible > search.length ? (
        ""
      ) : (
        <>{!alert.loading && <LoadMore load={load} showItems={showItems} />}</>
      )}
    </div>
  );
};

export default DisplaySearch;
