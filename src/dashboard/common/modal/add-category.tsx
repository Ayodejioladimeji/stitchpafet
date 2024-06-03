
import Loading from "@/common/loading";
import { GLOBALTYPES } from "@/redux/actions/globalTypes";
import { checkImage } from "@/utils/checkImage";
import { imageUpload } from "@/utils/imageUpload";
import { PostRequest } from "@/utils/request";
import { singleUpload } from "@/utils/singleUpload";
import cogoToast from "cogo-toast";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


//

const AddCategoryModal = ({ show, setShow }) => {
  const [name, setName] = useState("")
  const [buttonloading, setButtonloading] = useState(false)
  const dispatch = useDispatch()
  const { callback } = useSelector((state: any) => state.utils)
  const { token } = useSelector((state: any) => state.auth)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = e => {
    // const files = [e.target.files]

    const file = e.target.files[0];
    console.log(file)

    const err = checkImage(file);
    if (err) {
      cogoToast.error(err);
      return;
    }

    setSelectedFile(file)
  }

  // create category
  const handleCreate = async (e) => {
    e.preventDefault()

    let media: any;

    if (selectedFile) {
      media = await singleUpload(selectedFile)
    }

    setButtonloading(true)

    const payload = {
      name: name.toLowerCase(),
      image: media,
    }

    const res = await PostRequest("/categories", payload, token)
    if (res?.status === 200) {
      cogoToast.success(res.data.msg)
      dispatch({ type: GLOBALTYPES.CALLBACK, payload: !callback })
      setShow(false)
    }
    setButtonloading(false)
  }

  // 

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="confirm-modal"
    >

      <div className="confirm add-category">
        <h3>Add new category</h3>

        <form onSubmit={handleCreate}>
          <div className="form-box mb-4">
            <label>Category Image</label>
            <button type="button" id="img" className="upload-box">
              {selectedFile !== null ?
                <>
                  <Image
                    height={100}
                    width={100}
                    src={URL.createObjectURL(selectedFile)}
                    className="img-fluid"
                    alt="image"
                    unoptimized
                  />
                  <i
                    className="bi bi-x-circle"
                    onClick={() => setSelectedFile(null)}
                  ></i>
                </>
                :
                <small className="mb-0">
                  <input type="file" id="Image" className="file-up"
                    onChange={handleFile}
                    accept="image/*" />
                  <svg
                    className="mb-3"
                    width="40"
                    height="36"
                    viewBox="0 0 40 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.2756 8.21999V8.21999C30.5296 8.21999 29.8536 7.78999 29.5356 7.11799C28.9616 5.90199 28.2316 4.34799 27.7996 3.50199C27.1616 2.24399 26.1276 1.51199 24.6956 1.50199C24.6716 1.49999 15.3276 1.49999 15.3036 1.50199C13.8716 1.51199 12.8396 2.24399 12.1996 3.50199C11.7696 4.34799 11.0396 5.90199 10.4656 7.11799C10.1476 7.78999 9.4696 8.21999 8.7256 8.21999V8.21999C4.7336 8.21999 1.4996 11.454 1.4996 15.444V27.316C1.4996 31.304 4.7336 34.54 8.7256 34.54H31.2756C35.2656 34.54 38.4996 31.304 38.4996 27.316V15.444C38.4996 11.454 35.2656 8.21999 31.2756 8.21999Z"
                      stroke="#333333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6428 20.6692C13.6408 24.1752 16.5028 27.0432 20.0028 27.0412C23.4968 27.0372 26.3508 24.1812 26.3568 20.6832C26.3628 17.1712 23.5108 14.3092 20.0068 14.3052C16.4828 14.3012 13.6148 17.2112 13.6428 20.6692Z"
                      stroke="#333333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M29.805 15.9902C29.6118 15.9703 29.4209 15.9199 29.2072 15.8339C28.9694 15.7283 28.7636 15.5939 28.5646 15.3917C28.207 15.0114 28 14.5141 28 14.001C28 13.7284 28.0557 13.4583 28.1645 13.2136C28.2736 12.9657 28.4028 12.7566 28.6364 12.5291C28.814 12.3744 28.996 12.2499 29.2448 12.1403C29.9826 11.8479 30.8602 12.0226 31.4087 12.5708C31.573 12.7328 31.7115 12.9282 31.7883 13.093L31.8338 13.2099C31.9443 13.4583 32 13.7284 32 14.001C32 14.5244 31.7956 15.0086 31.4163 15.4115C31.0884 15.7416 30.6578 15.9446 30.1984 15.9902L30 16L29.805 15.9902Z"
                      fill="#333333"
                    />
                  </svg>
                  <br />
                  <i className="bi bi-upload"></i>Click to upload
                </small>
              }
            </button>
          </div>

          <div className="form-box mb-4">
            <label>Category Name</label>
            <input type="text" placeholder='Enter new category' value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <button className="submit">
            {buttonloading ? (
              <Loading
                height="25px"
                width="25px"
                primaryColor="#fff"
                secondaryColor="#fff"
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
