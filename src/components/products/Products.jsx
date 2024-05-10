import React from "react";

//
import ProductHeros from "./../productHero/ProductHeros";
import Search from "./../search/Search";
import NewArrivals from "./../newarrivals/NewArrivals";
import Advert2 from "./../advert2/Advert2";
import Health from "../newarrivals/Health";
import Advert1 from "./../advert1/Advert1";
import Electronics from "../newarrivals/Electronics";
import Computing from "../newarrivals/Computing";
import Phones from "./../newarrivals/Phones";
import { useSelector } from "react-redux";

//
import Supermarket from "./../newarrivals/Supermarket";
import Automobile from "./../newarrivals/Automobile";
import Loading from "./../../common/Loading";
import BabyProduct from "./../newarrivals/BabyProduct";

const Products = () => {
  const { all_product } = useSelector((state) => state.product);

  // fashion
  const fashion = all_product.filter(
    (item) => item.categories === "62e02ba4832770b3cf617b09"
  );

  const health = all_product.filter(
    (item) => item.categories === "62e02b6c832770b3cf617b04"
  );

  const electronics = all_product.filter(
    (item) => item.categories === "62e02b9a832770b3cf617b08"
  );

  const computing = all_product.filter(
    (item) => item.categories === "62e02b91832770b3cf617b07"
  );

  const phones = all_product.filter(
    (item) => item.categories === "62e02b86832770b3cf617b06"
  );

  const supermarket = all_product.filter(
    (item) => item.categories === "62e02b5e832770b3cf617b03"
  );

  const automobile = all_product.filter(
    (item) => item.categories === "62e02bd5832770b3cf617b0d"
  );

  const baby = all_product.filter(
    (item) => item.categories === "62e02bb3832770b3cf617b0a"
  );

  return (
    <div className="products">
      <ProductHeros />
      <Search />
      {fashion.length === 0 ? (
        <div className="product-loading">
          <Loading width="25px" height="25px" color="#fff" />
        </div>
      ) : (
        <NewArrivals />
      )}

      {/* health */}
      {health.length !== 0 && <Advert2 />}
      {health.length !== 0 && <Health />}

      {/* Electronics */}
      {electronics.length !== 0 && <Advert1 />}
      {electronics.length !== 0 && <Electronics />}

      {/* Computing */}
      {computing.length !== 0 && <Advert2 />}
      {computing.length !== 0 && <Computing />}

      {/* Phones */}
      {phones.length !== 0 && <Advert1 />}
      {phones.length !== 0 && <Phones />}

      {/* Baby Products */}
      {baby.length !== 0 && <Advert2 />}
      {baby.length !== 0 && <BabyProduct />}

      {/* Supermarket */}
      {supermarket.length !== 0 && <Advert2 />}
      {supermarket.length !== 0 && <Supermarket />}

      {/* Automobile */}
      {automobile.length !== 0 && <Advert1 />}
      {automobile.length !== 0 && <Automobile />}
    </div>
  );
};

export default Products;
