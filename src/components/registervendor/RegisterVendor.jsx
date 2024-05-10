import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

//
const RegisterVendor = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  const selectCountry = (val) => {
    setCountry(val);
  };

  const selectState = (val) => {
    setState(val);
  };

  return (
    <div className='vendor'>
      <div className='vendor-center'>
        <h2>Become a Seller</h2>
        <p>
          Fill in the required fields below to become a seller in an instant!
        </p>

        <div className='form-group'>
          <label>Fullname</label>
          <input type='text' />
        </div>
        <div className='form-group'>
          <label>Brand name</label>
          <input type='text' />
        </div>
        <div className='form-group'>
          <label>Address</label>
          <input type='text' />
        </div>

        <div className='form-group'>
          <label>Country</label>
          <CountryDropdown
            value={country}
            onChange={(val) => selectCountry(val)}
            className='input'
          />
        </div>

        {country !== '' && (
          <div className='form-group'>
            <label>State</label>
            <RegionDropdown
              country={country}
              value={state}
              onChange={(val) => selectState(val)}
              className='input'
            />
          </div>
        )}

        <div className='form-group'>
          <label>Account number</label>
          <input type='text' />
        </div>

        <div className='form-group'>
          <label>Bank Account Type</label>
          <select>
            <option>Savings account</option>
            <option>Current account</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Bank Name</label>
          <select>
            <option>GTB</option>
            <option>Acccess Bank</option>
          </select>
        </div>

        <div className='form-group'>
          <button>Become a seller</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterVendor;
