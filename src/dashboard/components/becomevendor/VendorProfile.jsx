import React from "react";

//

const VendorProfile = ({ values, handleChange, handleImage }) => {
  const { store_logo, store_name, store_address, bio } = values;

  //
  return (
    <div className="vendor-profile">
      <div className="vendor-brand">
        <div className="vendor-brand-logo">
          <img
            src={store_logo === "" ? "/assets/fav.png" : store_logo}
            alt=""
          />
        </div>

        <div className="vendor-brand-text">
          <h1>{store_name === "" ? "Your store name ..." : store_name}</h1>
          <small>{bio === "" ? "Bio goes here..." : bio}</small>
          <small>
            {store_address === ""
              ? "Store address goes here..."
              : store_address}
          </small>
        </div>
      </div>

      <div className="vendor-form">
        <div className="form-div">
          <div className="form-group">
            <label>Store name</label>
            <input
              type="text"
              name="store_name"
              value={store_name}
              placeholder="Mellyk stores"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Store address</label>
            <input
              type="text"
              name="store_address"
              value={store_address}
              onChange={handleChange}
              placeholder="22 Toyin street, Ikeja, Lagos State"
            />
          </div>
        </div>

        <div className="form-div">
          <div className="form-group">
            <label>Store logo</label>
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={handleImage}
              required
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={handleChange}
              placeholder="We deliver the best..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
