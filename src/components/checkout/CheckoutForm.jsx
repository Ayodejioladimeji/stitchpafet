import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const initialStates = {
  firstname: "",
  lastname: "",
  phone: "",
  city: "",
  address: "",
  postalcode: "",
  country: "",
  region: "",
};

const CheckoutForm = () => {
  const [values, setValues] = useState(initialStates);

  const {
    firstname,
    lastname,
    phone,
    city,
    address,
    postalcode,
    country,
    region,
  } = values;

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Firstname*"
            value={firstname}
            name="firstname"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Lastname*"
            value={lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Phone number*"
            value={phone}
            name="phone"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="City*"
            value={city}
            name="city"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Street address*"
            values={address}
            name="address"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Postalcode*"
            values={postalcode}
            name="postalcode"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <CountryDropdown
            value={country}
            onChange={(val) => selectCountry(val)}
            className="input"
          />
        </div>

        {country !== "" && (
          <div className="form-group">
            <RegionDropdown
              country={country}
              value={region}
              onChange={(val) => selectRegion(val)}
              className="input"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
