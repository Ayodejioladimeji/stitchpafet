import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS

import { prices } from "../../constants/Prices";
import { subCategories } from "../../redux/actions/ProductAction";

//
// Initial State
const initialState = {
  state: "",
  category: "",
  subCategory: "",
  startPrice: "",
  endPrice: "",
};

const Search = () => {
  const { get_categories, get_sub_categories } = useSelector(
    (state: any) => state.product
  );
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { state, category, subCategory, startPrice, endPrice } = values;

  // Get all sub categories
  useEffect(() => {
    if (category) {
      // dispatch(subCategories(category));
    }
  }, [dispatch, category]);

  // handleChange method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setError("");
  };

  // onSubmit method
  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(startPrice) > parseInt(endPrice)) {
      setError("End price should be greater than start price");
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <div className="search-box">

          <div className="search-card">
            <label>Category</label>
            <select className="form-select" onChange={handleChange} name="category" value={category}>
              <option defaultValue="">Select</option>
              {/* {get_categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))} */}
            </select>
          </div>

          <div className="search-card">
            <label>Ratings</label>
            <select className="form-select"
              onChange={handleChange}
              name="subCategory"
              value={subCategory}
            >
              <option defaultValue="">Select</option>
              {get_sub_categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="search-card">
            <label>price(From)</label>
            <select className="form-select"
              onChange={handleChange}
              name="startPrice"
              value={startPrice}
            >
              <option defaultValue="">From</option>
              {prices.map((item, index) => (
                <option key={index} value={item}>
                  ₦{item}
                </option>
              ))}
            </select>
          </div>

          <div className="search-card">
            <label>price(To)</label>
            <select className="form-select" onChange={handleChange} name="endPrice" value={endPrice}>
              <option defaultValue="">To</option>
              {prices
                .filter((item) => item > 1000)
                .map((item, index) => (
                  <option key={index} value={item}>
                    ₦{item}
                  </option>
                ))}
            </select>
          </div>

          <div className="search-card">
            <button>Search</button>
          </div>
        </div>
      </form>

      <small className="search-error">{error}</small>
    </div>
  );
};

export default Search;
