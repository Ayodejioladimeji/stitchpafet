import React, { useEffect, useState } from "react";
import { data } from "../../constants/SecureData";
import Heading from "../heading/Heading";
import Card from "@/common/card/Card";
import ProductCard from "@/common/productcard/ProductCard";
import { GetRequest } from "@/utils/request";
import { useSelector } from "react-redux";
import CardSkeleton from "@/dashboard/common/skeleton/CardSkeleton";

const Securely = () => {
  const [product, setProduct] = useState(null)
  const { token } = useSelector((state: any) => state.auth)
  const [loading, setLoading] = useState(true)

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
  }, [token])

  // 
  return (
    <div className="secure">
      <div className="container">
        <Heading
          heading="Shop with Confidence and Convenience"
          text="Enjoy a seamless shopping experience with our easy-to-use online store. Browse our curated collections, choose your favorite styles, and check out with ease."
        />

        <div className="secure-box">
          {loading ? <CardSkeleton length={5} /> : <>
            {product?.slice(0, 5)?.map((item, key) => {
              console.log(item)
              return <Card item={item} key={key} />;
            })}</>}
        </div>
      </div>
    </div>
  );
};

export default Securely;
