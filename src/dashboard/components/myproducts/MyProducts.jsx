import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//
import ProductCard from "./../../common/productcard/ProductCard";
import CreateProduct from "./CreateProduct";
import Loading from "./../../../common/alert/Loading";

//

const MyProducts = () => {
  const { alert } = useSelector((state) => state);
  const { product_modal, vendor_product } = useSelector(
    (state) => state.product
  );
  const history = useHistory();
  const [values, setValues] = useState("");

  //   Filtering for search
  const filteredData = vendor_product?.data?.filter((my_order) => {
    return Object.values(my_order).join(" ").toLowerCase().match(values);
  });

  return (
    <div className="my-products">
      <div className="product-heading">
        <h2>Vendor Product Page</h2>
        <p>Click the add product button to create more products</p>

        <div className="my-products-header">
          <input
            type="search"
            placeholder="Enter product name"
            value={values}
            onChange={(e) => setValues(e.target.value)}
          />

          <button
            onClick={() =>
              history.push("/dashboard/my-products/create-product")
            }
          >
            <FiPlusCircle className="plus" /> Add Product
          </button>
        </div>
      </div>

      {alert.loading ? (
        <div className="beneficiary-loading">
          <Loading width="25px" height="25px" color="#fff" />
        </div>
      ) : (
        <>
          {filteredData?.length === 0 ? (
            <p className="text-center mt-5">Search not found</p>
          ) : (
            <div className="my-products-body">
              {filteredData?.map((item) => (
                <ProductCard key={item._id} {...item} />
              ))}
            </div>
          )}
        </>
      )}

      {product_modal && <CreateProduct />}
    </div>
  );
};

export default MyProducts;
