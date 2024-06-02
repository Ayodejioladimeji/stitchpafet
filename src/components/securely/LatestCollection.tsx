import React, { useEffect, useState } from "react";
import { data } from "../../constants/SecureData";
import Heading from "../heading/Heading";
import Card from "@/common/card/Card";
import ProductCard from "@/common/productcard/ProductCard";
import { useSelector } from "react-redux";
import { GetRequest } from "@/utils/request";
import CardSkeleton from "@/dashboard/common/skeleton/CardSkeleton";

const LatestCollection = () => {
  const [product, setProduct] = useState(null)
  const { token } = useSelector((state: any) => state.auth)
  const [loading, setLoading] = useState(true)

  // 

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
          heading="Explore our Curated Collections"
          text="Indulge in a hassle-free shopping spree with our user-friendly online store. We've meticulously curated collections of the finest unisex native fabrics, ensuring that you find exactly what you're looking for with ease."
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

export default LatestCollection;
