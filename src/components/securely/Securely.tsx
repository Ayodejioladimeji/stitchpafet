import React from "react";
import { data } from "../../constants/SecureData";
import Heading from "../heading/Heading";
import Card from "@/common/card/Card";
import ProductCard from "@/common/productcard/ProductCard";

const Securely = () => {
  return (
    <div className="secure">
      <div className="container">
        <Heading
          heading="Shop with Confidence and Convenience"
          text="Enjoy a seamless shopping experience with our easy-to-use online store. Browse our curated collections, choose your favorite styles, and check out with ease."
        />

        <div className="secure-box">
          {data?.slice(0, 8)?.map((item, key) => {
            return <Card item={item} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Securely;
