import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import Toast from "./Toast";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.error && (
        <Toast
          title="error"
          msg={{ body: alert.error }}
          // handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          className="errMsg"
        />
      )}

      {alert.success && (
        <Toast
          title="success"
          msg={{ body: alert.success }}
          // handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          className="successMsg"
        />
      )}

      {alert.notify && (
        <Toast
          msg={{ body: alert.notify }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          className="notifyMsg"
        />
      )}
    </div>
  );
};

export default Alert;
