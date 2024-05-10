import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimesCircle } from "react-icons/fa";
import { GLOBALTYPES } from "./../../redux/actions/globalTypes";

const ProfileToast = () => {
  const { profile_alert } = useSelector((state) => state.other);
  const dispatch = useDispatch();
  return (
    <div className="profileMsg">
      <div className="msg_header">
        <strong className="title">Profile Update</strong>

        <FaTimesCircle
          className="times"
          onClick={() =>
            dispatch({ type: GLOBALTYPES.PROFILEALERT, payload: {} })
          }
        />
      </div>
      <div className="body">{profile_alert.error}</div>
    </div>
  );
};

export default ProfileToast;
