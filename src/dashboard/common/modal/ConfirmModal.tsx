
import Loading from "@/common/loading";
import { Modal } from "react-bootstrap";


//

const ConfirmDeleteModal = ({ show, setShow, buttonloading, handleSubmit }) => {

  // 

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="confirm-modal"
    >

      <div className="confirm">
        <h3>Delete Item</h3>


        {/* <i onClick={() => setConfirm(false)} className="bi bi-x-circle"></i> */}

        <p>You are about to delete this item. <br /> Do you wish to proceed?
        </p>


        <div className="d-flex align-items-center justify-content-center gap-3">
          <button onClick={() => setShow(false)} className="no">
            No
          </button>

          <button onClick={handleSubmit}>
            {buttonloading ? (
              <Loading
                height="25px"
                width="25px"
                primaryColor="#fff"
                secondaryColor="#fff"
              />
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
