import statesData from "@/constants/statesdata";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useSelector } from "react-redux";

const initialStates = {
  firstname: "",
  lastname: "",
  phone: "",
  city: "",
  address: "",
  postalcode: "",
  state: "",
  region: "",
};

const CheckoutForm = () => {
  const [values, setValues] = useState(initialStates);
  const [cities, setCities] = useState(null)
  const router = useRouter()
  const { user, token } = useSelector((state: any) => state.auth);


  // get cities
  useEffect(() => {
    const res = statesData.find((item) => item.value === values?.state);

    const response = res?.lgas?.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    setCities(response);
  }, [values?.state]);


  // onChange method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };



  // make payment
  const handlePayment = () => {
    console.log(token)
    // check if user is logged in

  }

  return (
    <div className="checkout-form">
      <form className="row">
        <div className="col-6">
          <div className="form-group">
            <input
              type="text"
              placeholder="Firstname*"
              value={values.firstname}
              name="firstname"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="form-group">
            <input
              type="text"
              placeholder="Lastname*"
              value={values.lastname}
              name="lastname"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="form-group">
            <input
              type="text"
              placeholder="Phone : 08022222222"
              value={values.phone}
              name="phone"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="form-group">
            <input
              type="text"
              placeholder="Landmark"
              value={values.city}
              name="city"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <input
              type="text"
              placeholder="Street address*"
              value={values.address}
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="form-group">
            <select
              className="form-select"
              id="inputState"
              value={values?.state}
              name="state"
              onChange={handleChange}
            >
              <option defaultValue="Select state">Select state</option>
              {statesData.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-6">
          {values?.state !== "" && (
            <div className="form-group">
              <select
                className="form-select"
                id="inputState"
                value={values?.state}
                name="state"
                onChange={handleChange}
              >
                <option defaultValue="">Select Area</option>
                {cities?.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </form>

      <div className="pay-buttons">
        <button onClick={() => router.push("/products")}>
          <i className="bi bi-arrow-left"></i>
          Continue Shopping</button>

        <button onClick={handlePayment}>Make Payment</button>
      </div>

    </div>
  );
};

export default CheckoutForm;
