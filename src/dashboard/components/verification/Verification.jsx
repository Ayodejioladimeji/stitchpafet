import React, { useState } from "react";
import { FaUpload, FaCameraRetro } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import Camera from "./../camera/Camera";
// import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from "react-icons/fa";
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import VendorProfile from "./VendorProfile";

// initial states
const initialState = {
  store_name: "",
  store_address: "",
  store_logo: "",
  bio: "",
  document_type: "",
  document: "",
};

const Verification = () => {
  const [cam, setCam] = useState(false);
  const { camera } = useSelector((state) => state.utils);
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);

  //

  const { document_type, document } = values;

  // handleChange function
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  // convert image to base64
  const convert = (e) => {
    const file = e.target.files[0];
    if (file > 2000000) {
      console.log("File too large");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setValues((prevState) => ({
        ...prevState,
        document: reader.result,
      })); //base64encoded string
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file > 2000000) {
      console.log("File too large");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setValues((prevState) => ({
        ...prevState,
        store_logo: reader.result,
      })); //base64encoded string
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  // sumbmit verify document
  const verifyDocument = () => {
    const newData = {
      store_name: values.store_name,
      store_address: values.store_address,
      store_logo: values.store_logo,
      bio: values.bio,
      document_type: document_type,
      document: document,
      selfie: camera,
    };

    console.log(newData);
  };

  return (
    <div className="verification">
      <h3>Vendor Profile & Verification</h3>
      <hr />

      <VendorProfile
        handleImage={handleImage}
        values={values}
        handleChange={handleChange}
      />

      <div className="verification-box">
        <label>Choose Identity</label>

        <div className="verification-div">
          <div className="verification-document">
            <select
              onChange={handleChange}
              value={document_type}
              name="document_type"
            >
              <option>Choose document</option>
              <option>International Passport</option>
              <option>National ID Card</option>
              <option>Drivers Licence</option>
            </select>

            <div className="document-box">
              {document !== "" && <img src={document && document} alt="" />}
              {document !== "" && (
                <FaTimesCircle
                  onClick={() =>
                    setValues((prevState) => ({
                      ...prevState,
                      document: "",
                    }))
                  }
                  className="camera-times"
                />
              )}

              <span>
                <FaUpload className="upload-icon" />
                <small>upload document</small>
                <small>2MB</small>

                <input
                  type="file"
                  accept="image/*"
                  placeholder="Enter product amount"
                  name="avatar"
                  onChange={convert}
                  className="file_up"
                  required
                />
              </span>
            </div>
          </div>

          <div className="verification-document ">
            <select>
              <option>Take Selfie</option>
            </select>

            {!camera ? (
              <div onClick={() => setCam(true)} className="document-box boxer">
                <FaCameraRetro className="upload-icon" />
                <small>Take Selfie</small>
                <small>2MB</small>
              </div>
            ) : (
              <div className="document-box boxer">
                <img src={camera} alt="camera" />

                <FaTimesCircle
                  onClick={() =>
                    dispatch({ type: GLOBALTYPES.CAMERA, payload: "" })
                  }
                  className="camera-times"
                />
              </div>
            )}
          </div>
        </div>

        <button onClick={verifyDocument}>Verify Vendor</button>
      </div>

      {cam && <Camera setCam={setCam} />}
    </div>
  );
};

export default Verification;
