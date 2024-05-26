import React from "react";
import AlertModal from "../../common/alertmodal/AlertModal";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

import { Formik } from "formik";

// COMPONENTS
import Loading from "../../common/Loading";
import { changePassword } from "../../redux/actions/authAction";
import { resetpasswordModal } from "../../redux/actions/authAction";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

const ResetPassword = () => {
  const { alert } = useSelector((state) => state);
  const { token } = useSelector((state) => state.auth);
  const { resetpassword_modal } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  // const [typePass, setTypePass] = useState(false);
  // const [typePassword, setTypePassword] = useState(false);
  // const history = useHistory();

  return (
    <Formik
      initialValues={{
        oldpassword: "",
        password: "",
        password2: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const newData = {
          old_password: values.oldpassword,
          password: values.password,
        };
        setTimeout(async () => {
          dispatch(changePassword(newData, token.token));

          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

        //   THE OLD PASSWORD SECTION
        if (!values.oldpassword) {
          errors.oldpassword = "Password is Required";
        } else if (values.oldpassword.length < 8) {
          errors.oldpassword = "Password must be 8 characters long.";
        }

        // THE PASSWORD SECTION
        if (!values.password) {
          errors.password = "Password is Required";
        } else if (values.password.length < 8) {
          errors.password = "Password must be 8 characters long.";
        } else if (!passwordUpper.test(values.password)) {
          errors.password = "Password must contain one UpperCase letter";
        } else if (!passwordLower.test(values.password)) {
          errors.password = "Password must contain one LowerCase letter";
        } else if (!passwordRegex.test(values.password)) {
          errors.password = "password Must contain one number";
        } else if (!passwordSpecial.test(values.password)) {
          errors.password = "password Must contain one special character";
        }

        // THE CONFIRM PASSWORD
        if (!values.password2) {
          errors.password2 = "Confirm your password";
        } else if (values.password !== values.password2) {
          errors.password2 = "Password does not match";
        }

        return errors;
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <>
            {resetpassword_modal && (
              <AlertModal>
                <div className="reset-password">
                  <h3>CHANGE PASSWORD</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group">
                      <label htmlFor="password">Old Password</label>
                      <input
                        name="oldpassword"
                        type="password"
                        placeholder="Enter old password"
                        value={values.oldpassword}
                        autoComplete="on"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.oldpassword && touched.oldpassword && "error"
                        }
                      />

                      {errors.oldpassword && touched.oldpassword && (
                        <div className="input_feedback">
                          {errors.oldpassword}
                        </div>
                      )}
                      {/* <div
                              className={
                                errors.password
                                  ? 'ey'
                                  : !errors.password
                                  ? 'eyee'
                                  : 'eyees'
                              }
                              onClick={() => setTypePass(!typePass)}
                            >
                              {typePass ? <FaEyeSlash /> : <FaEye />}
                            </div> */}
                    </div>

                    <div className="input-group">
                      <label htmlFor="password">New Password</label>
                      <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        autoComplete="on"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password && "error"
                        }
                      />

                      {errors.password && touched.password ? (
                        <div className="input_feedback">{errors.password}</div>
                      ) : (
                        <div className="input_feed">
                          Password must be 8 characters long, one Uppercase,one
                          Number, one Character
                        </div>
                      )}
                      {/* <div
                              className={
                                errors.password
                                  ? 'ey'
                                  : !errors.password
                                  ? 'eyee'
                                  : 'eyees'
                              }
                              onClick={() => setTypePass(!typePass)}
                            >
                              {typePass ? <FaEyeSlash /> : <FaEye />}
                            </div> */}
                    </div>

                    <div className="input-group">
                      <label htmlFor="password">Confirm New Password</label>
                      <input
                        name="password2"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password2}
                        autoComplete="on"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password2 && touched.password2 && "error"
                        }
                      />
                      {errors.password2 && touched.password2 && (
                        <div className="input_feedback">{errors.password2}</div>
                      )}
                      {/* <div
                              className={errors.password2 ? 'eye' : 'eyes'}
                              onClick={() => setTypePassword(!typePassword)}
                            >
                              {typePassword ? <FaEyeSlash /> : <FaEye />}
                            </div> */}
                    </div>

                    <div className="input-group">
                      <button type="submit" disabled={isSubmitting}>
                        {alert.authloading === true ? (
                          <Loading width="25px" height="25px" color="#fff" />
                        ) : (
                          "Change Password"
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="cancel">
                  <FaTimes
                    onClick={() => dispatch(resetpasswordModal(false))}
                  />
                </div>
              </AlertModal>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
