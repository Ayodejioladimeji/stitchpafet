import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Loading from "@/common/loading";
import { formatMoney } from "@/utils/utils";
import Layout from "@/dashboard/common/Layout";
import { GetRequest } from "@/utils/request";
import Card from "@/dashboard/components/Card";
import CardSkeleton from "@/dashboard/common/skeleton/CardSkeleton";


// 

const Products = () => {
  const { token } = useSelector((state: any) => state?.auth);
  const { my_orders } = useSelector((state: any) => state.order);
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null)

  // console.log(my_orders);

  // useEffect
  useEffect(() => {
    if (token) {
      const getProduct = async () => {
        const res = await GetRequest("/product", token)
        if (res?.status === 200) {
          setProduct(res.data.products)
        }
        setLoading(false)
      }
      getProduct()
    }
  }, [token]);

  //   The search handleChange
  const handleChange = (e) => {
    setData(e.target.value);
  };

  //   Filtering for search
  const filteredData = my_orders?.filter((my_order) => {
    return Object.values(my_order).join(" ").toLowerCase().match(data);
  });

  // order details method
  const orderDetailsMethod = (id) => {
    router.push(`/dashboard/my-orders/details/${id}`);
    dispatch({ type: GLOBALTYPES.ORDER_ID, payload: id });
  };

  console.log(product)

  //

  return (
    <Layout>
      <div className="dashboard-container">

        {loading ? (
          <div className="product-section">
            <CardSkeleton />
          </div>
        ) : (
          <div className="product-container">
            <div className="product-top mb-5">
              <input placeholder="search products" className="form-input" />
            </div>

            <div className="product-section">
              {product?.map((item, index) => {
                return (
                  <Card key={index} item={item} />
                )
              })}
            </div>
          </div>
        )}

        <p className="text-center mt-5">
          {filteredData?.length === 0 && !loading && loading
            ? "Orders not found"
            : ""}{" "}
        </p>
      </div>
    </Layout>
  );
};

export default Products;
