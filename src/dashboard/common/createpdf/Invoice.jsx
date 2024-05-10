import React from "react";
import { addComma } from "comma-separator";
// import { Page, Document } from "@react-pdf/renderer";

//
import { getDate } from "../../../utils/utils";

//

const Invoice = (props) => {
  const { invoiceref, order_details } = props;
  const { sub_total, verifibiz_charge, total } = order_details;

  return (
    <div className="invoice-details">
      <div className="invoice-details-center" ref={invoiceref}>
        <div className="invoice-logo">
          <img src="/assets/new-logo-light.png" alt="" />
        </div>

        <h1>Order Details</h1>

        <>
          <div className="invoice-box">
            <h3>Seller's Email</h3>
            <p>{order_details.sellerEmail}</p>
          </div>

          <div className="invoice-box">
            <h3>Buyers Name</h3>
            <p>{order_details.buyersName}</p>
          </div>
          <div className="invoice-box">
            <h3>Buyer's Email</h3>
            <p>{order_details.buyersEmail}</p>
          </div>
          <div className="invoice-box">
            <h3>VerifiBiz Id</h3>
            <p>{order_details.userid}</p>
          </div>

          <div className="invoice-box">
            <h3>Delivery Address</h3>
            <p>{order_details.address}</p>
          </div>

          <div className="invoice-box">
            <h3>Status</h3>
            <p
              style={{
                color:
                  order_details.status === "pending"
                    ? "orange"
                    : order_details.status === "delivered"
                    ? "green"
                    : order_details.status === "awaiting-disbursement"
                    ? "blue"
                    : "red",
                textTransform: "capitalize",
              }}
            >
              {order_details.status}
            </p>
          </div>

          <div className="invoice-box">
            <h3>Transaction Reference</h3>
            <p>{order_details.reference}</p>
          </div>

          <div className="invoice-box">
            <h3>Date</h3>
            <p>{getDate(order_details.created_at)}</p>
          </div>

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
              {order_details?.products?.map((item, index) => {
                const {
                  product_name,
                  product_amount,
                  product_image,
                  quantity,
                } = item;

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
          <div className="total-order">
            <div className="invoice-total-box">
              <h3>Sub Total</h3>
              <p>
                <b>₦{addComma(sub_total ? sub_total : "")}</b>
              </p>
            </div>
            <div className="invoice-total-box">
              <h3>Verifibiz Charges (2%)</h3>
              <p>
                <b>₦{addComma(verifibiz_charge ? verifibiz_charge : "")}</b>
              </p>
            </div>
            <div className="invoice-total-box">
              <h3>Grand Total</h3>
              <p>
                <b>₦{addComma(total ? total : "")}</b>
              </p>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Invoice;
