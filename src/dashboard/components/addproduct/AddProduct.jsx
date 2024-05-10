import React from "react";
import AddProductModal from "../../common/modal/AddProductModal";

import { useSelector } from "react-redux";

const AddProduct = ({
  values,
  handleChange,
  handleImage,
  handleSubmit,
  convert,
}) => {
  const { isEdit } = useSelector((state) => state.dashboard);

  const { product_name, product_amount, quantity, product_description } =
    values;

  return (
    <AddProductModal>
      <div className="add-product">
        <p>Fill the form below to add product</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product name</label>
            <input
              type="text"
              placeholder="Enter product name"
              name="product_name"
              value={product_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product amount</label>
            <input
              type="number"
              placeholder="Enter product amount"
              name="product_amount"
              value={product_amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Qty</label>
            <select
              onChange={handleChange}
              name="quantity"
              value={quantity}
              required="required"
            >
              <option value="">Choose Quantity</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
            </select>
          </div>

          <div className="form-group">
            <label>Product image</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Enter product amount"
              name="avatar"
              onChange={convert}
              required
            />
          </div>

          <div className="form-group">
            <label>Product description</label>
            <textarea
              placeholder="Enter product description"
              name="product_description"
              value={product_description}
              onChange={handleChange}
              required
            />
          </div>

          <button>{isEdit ? "Edit product" : "Add Product"}</button>
        </form>
      </div>
    </AddProductModal>
  );
};

export default AddProduct;
