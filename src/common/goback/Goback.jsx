import React from "react";
import { useHistory } from "react-router-dom";
import { CgArrowLongLeft } from "react-icons/cg";
//

const Goback = () => {
  const history = useHistory();
  return (
    <button className="goback" onClick={() => history.goBack()}>
      <CgArrowLongLeft className="back-icon" />
      <div>Go back</div>
    </button>
  );
};

export default Goback;
