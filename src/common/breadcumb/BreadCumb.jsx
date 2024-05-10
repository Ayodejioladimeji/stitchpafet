import React from "react";
import Goback from "../../../common/goback/Goback";
//
const BreadCumb = ({ header, text, img }) => {
  return (
    <div className="breadcumb">
      <div className="breadcumb-info">
        <h1>{header}</h1>
        <p>{text}</p>
        <Goback />
      </div>

      <div className="breadcumb-img">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default BreadCumb;
