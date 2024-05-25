import statesData from "@/constants/statesdata";
import React, { useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

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

  // get cities
  useEffect(() => {
    const res = statesData.find((item) => item.value === values?.state);

    const response = res?.lgas?.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    setCities(response);
  }, [values?.state]);

  const selectCountry = (val) => {
    setValues((prevState) => ({
      ...prevState,
      country: val,
    }));
  };

  const selectRegion = (val) => {
    setValues((prevState) => ({
      ...prevState,
      region: val,
    }));
  };

  // onChange method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="checkout-form">
      <form className="row" onSubmit={handleSubmit}>
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
        <button>
          <i className="bi bi-arrow-left"></i>
          Continue Shopping</button>

        <button>Make Payment</button>
      </div>

    </div>
  );
};

export default CheckoutForm;
