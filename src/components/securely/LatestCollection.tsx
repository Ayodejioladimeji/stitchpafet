import React from "react";
import { data } from "../../constants/SecureData";
import Heading from "../heading/Heading";
import Card from "@/common/card/Card";
import ProductCard from "@/common/productcard/ProductCard";

const LatestCollection = () => {
  return (
    <div className="secure">
      <div className="container">
        <Heading
          heading="Explore our Curated Collections"
          text="Indulge in a hassle-free shopping spree with our user-friendly online store. We've meticulously curated collections of the finest unisex native fabrics, ensuring that you find exactly what you're looking for with ease."
        />

        <div className="secure-box">
          {data?.slice(0, 5)?.map((item, key) => {
            return <Card item={item} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
