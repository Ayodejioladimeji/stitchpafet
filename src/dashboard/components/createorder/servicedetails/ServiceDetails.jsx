import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { addComma, removeComma } from "comma-separator";

//
import { useSelector } from "react-redux";
import Loading from "./../../../../common/alert/Loading";

const ServiceDetails = ({
  navigation,
  added_products,
  subTotal,
  charges,
  data,
  createOrder,
  loading,
}) => {
  const { user } = useSelector((state) => state.auth);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Scroll page to top when route changes
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="service-details">
      <div className="service-details-center">
        <h1>Service Details</h1>

        {/* <h2>Seller's Information</h2> */}
        <div className="service-box">
          <h3>Seller's Email</h3>
          <p>{data.sellersEmail}</p>
        </div>
        {/* 
        <h2>Buyer's Information</h2> */}
        <div className="service-box">
          <h3>Buyers Name</h3>
          <p>
            {user.first_name} {user.last_name}
          </p>
        </div>
        <div className="service-box">
          <h3>Buyer's Email</h3>
          <p>{user.email}</p>
        </div>
        <div className="service-box">
          <h3>VerifiBiz Id</h3>
          <p>{user.user_id}</p>
        </div>

        <div className="service-box">
          <h3>Delivery Address</h3>
          <p>{data.address}</p>
        </div>

        <div className="service-box">
          <h3>Delivery Fee</h3>
          <p>₦{data.deliveryfee}</p>
        </div>

        {/* <h2>Delivery Address</h2> */}

        {/* <h2>Product Details</h2> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Thumbnails</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Sub-total</th>
            </tr>
          </thead>

          <tbody style={{ border: "0" }}>
            {added_products.map((item, index) => {
              const { product_name, product_amount, product_image, quantity } =
                item;

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img src={product_image} alt="course-pic" />
                    </div>
                  </td>
                  <td>{product_name}</td>
                  <td>₦{addComma(product_amount)}</td>
                  <td>{quantity}</td>
                  <td>₦{addComma(product_amount * quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/*  */}
        <div className="total-service">
          <div className="service-total-box">
            <h3>Delivery Fee</h3>
            <p>
              <b>₦{addComma(data.deliveryfee)}</b>
            </p>
          </div>
          <div className="service-total-box">
            <h3>Sub Total</h3>
            <p>
              <b>₦{addComma(subTotal)}</b>
            </p>
          </div>
          <div className="service-total-box">
            <h3>Verifibiz Charges (2%)</h3>
            <p>
              <b>₦{addComma(charges)}</b>
            </p>
          </div>

          <div className="service-total-box">
            <h3>Grand Total</h3>
            <p>
              <b>
                ₦{addComma(subTotal + charges + removeComma(data.deliveryfee))}
              </b>
            </p>
          </div>
        </div>

        <div className="service-buttons">
          <button className="previous" onClick={() => navigation.previous()}>
            Previous
          </button>
          <button onClick={createOrder}>
            {loading ? (
              <Loading width="20px" height="20px" color="#fff" />
            ) : (
              "Create Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
