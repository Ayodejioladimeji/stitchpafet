import React from "react";
import WalletsModal from "./../../common/modal/WalletsModal";

//
const AddBeneficiary = () => {
  return (
    <WalletsModal>
      <div className="add-beneficiary">
        <h3>Add Beneficiary</h3>
        <div className="form-group">
          <label>Email</label>
          <input type="text" placeholder="Enter beneficiary email" />
        </div>

        <button>Add Beneficiary</button>
      </div>
    </WalletsModal>
  );
};

export default AddBeneficiary;
