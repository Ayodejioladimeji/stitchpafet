import React, { useRef } from "react";
import ReactToPdf from "react-to-pdf";

//
const Createpdf = (props) => {
  const invoiceref = useRef();

  return (
    <div className="createpdf">
      {props.children({
        invoiceref,
      })}
      <ReactToPdf filename="Order Invoice" targetRef={invoiceref}>
        {({ toPdf }) => (
          <button onClick={toPdf} className="create-pdf-button">
            Download Invoice
          </button>
        )}
      </ReactToPdf>
    </div>
  );
};
export default Createpdf;
