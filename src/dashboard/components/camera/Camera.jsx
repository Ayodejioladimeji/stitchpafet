import React, { useState } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";

//
import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";
import CameraModal from "./../../common/modal/CameraModal";

//

const videoConstraints = {
  width: 300,
  height: 250,
  facingMode: "user",
};

const Camera = ({ setCam }) => {
  const [image, setImage] = useState("");

  const webcamRef = React.useRef(null);
  const dispatch = useDispatch();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, []);

  //

  //

  return (
    <CameraModal setCam={setCam}>
      <div className="camera">
        <div className="camera-display">
          {image === "" ? (
            <Webcam
              audio={false}
              imageSmoothing={true}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          ) : (
            <img src={image} alt="capture" />
          )}
        </div>

        <div className="camera-button">
          {image !== "" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setImage("");
              }}
              className="webcam-btn"
            >
              Retake Image
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                capture();
              }}
              className="webcam-btn"
            >
              Capture
            </button>
          )}

          {image !== "" && (
            <button
              onClick={() => {
                dispatch({ type: GLOBALTYPES.CAMERA, payload: image });
                setCam(false);
              }}
            >
              Continue
            </button>
          )}
        </div>

        <span className="position">
          Please position you face to take a clear selfie
        </span>
      </div>
    </CameraModal>
  );
};

export default Camera;
