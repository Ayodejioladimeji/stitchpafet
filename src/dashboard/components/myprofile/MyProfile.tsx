import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

//
import { updateUser } from "../../../redux/actions/authAction";
import { FaEdit } from "react-icons/fa";
import { uploadImage } from "../../../redux/actions/authAction";
import Loading from "../../../common/alert/Loading";

// initial states
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  address: "",
  bio: "",
};

const MyProfile = () => {
  const [values, setValues] = useState(initialState);
  const { user, token } = useSelector((state: any) => state.auth);
  const { callback } = useSelector((state: any) => state.utils);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  //
  useEffect(() => {
    const newUser = {
      first_name: user.first_name ? user.first_name : "",
      last_name: user.last_name ? user.last_name : "",
      email: user.email,
      phone: user.phone,
      country: user.country ? user.country : "",
      state: user.state ? user.state : "",
      address: user.address ? user.address : "",
      bio: user.bio ? user.bio : "",
    };

    if (user) {
      setValues(newUser);
    }
  }, [user, callback]);

  //   handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // const changePhoneNumber = (e) => {
  //   setPhoneNumber(e);
  // };

  const selectCountry = (val) => {
    setValues((prevState) => ({
      ...prevState,
      country: val,
    }));
    // setCountry(val);
  };

  const selectRegion = (val) => {
    setValues((prevState) => ({
      ...prevState,
      state: val,
    }));
    // setRegion(val);
  };

  //   update function
  const handleUpdate = (e) => {
    e.preventDefault();
    const newData = {
      user_id: user.user_id,
      first_name: values.first_name,
      last_name: values.last_name,
      email: user.email,
      phone: user.phone,
      country: values.country,
      state: values.state,
      address: values.address,
      bio: values.bio,
    };

    // console.log(newData);

    // dispatch(updateUser(newData, token.token, callback, setLoading));
  };

  // CHANGE AVATAR
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    // let formData = new FormData();
    // formData.append('file', file);
    setAvatar(file);
    const newData = {
      profile_pic: file,
    };
    // setLoad(true);

    // dispatch(uploadImage(newData, token.token, callback, setLoad));
  };

  //
  return (
    <div className="my-profile">
      <div className="my-profile-div">
        <div className="profile-image">
          <img
            src=""
            alt=""
          />
          <span>
            {load ? (
              <Loading width="15px" height="15px" color="#fff" />
            ) : (
              <FaEdit className="fa_camera" />
            )}
            {/* <p>Change</p> */}
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
              className="file_up"
            />
          </span>
        </div>

        <div className="profile-body">
          <form onSubmit={handleUpdate}>
            <div className="profile-form">
              <div className="form_group">
                <label>Firstname</label>
                <input
                  type="text"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>

              <div className="form_group">
                <label>Lastname</label>
                <input
                  type="text"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="profile-form">
              <div className="form_group">
                <label>Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder=""
                  disabled
                />
              </div>

              <div className="form_group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder=""
                  disabled
                />
              </div>
            </div>

            <div className="profile-form">
              {/* <div className="form_group">
                <label>Country</label>
                <CountryDropdown
                  name="country"
                  value={values.country}
                  onChange={(val) => selectCountry(val)}
                  className="input"
                />
              </div>

              <div className="form_group">
                <label>State</label>
                <RegionDropdown
                  name="state"
                  country={values.country}
                  value={values.state}
                  onChange={(val) => selectRegion(val)}
                  className="input"
                />
              </div> */}
            </div>

            <div className="form_group">
              <label>Street Address</label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                placeholder=""
              />
            </div>

            <div className="form_group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={values.bio}
                onChange={handleChange}
                placeholder=""
              />
            </div>

            <button>{loading ? "Updating..." : "Update Profile"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
