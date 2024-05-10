import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";

// COMPONENTS
import Loading from "../../../common/Loading";
import { resetPassword } from "./../../../redux/actions/authAction";
import SEO from "./../../../common/SEO";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;
const email = sessionStorage.getItem("email");
//

const ResetPassword = () => {
  const { alert } = useSelector((state) => state);

  const dispatch = useDispatch();

  //

  return (
    <Formik
      initialValues={{
        code: "",
        password: "",
        password2: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { code, password, password2 } = values;

        const newData = {
          email: email,
          code: code,
          password: password,
          confirmPassword: password2,
        };
        setTimeout(async () => {
          dispatch(resetPassword(newData));

          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

        //   THE PASSWORD SECTION
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
          <div className="login">
            <SEO title="Reset Password" />
            <div className="login-left">
              <div className="login-top">
                <img src="/assets/new-logo-lights.png" alt="" />

                <h2>Fast and stress-free Escrow system</h2>
                <Link to="/">
                  <button>Go Home</button>
                </Link>
              </div>
            </div>

            <div id="overflow" className="login-right">
              <div className="login-form">
                <h1>Reset your Password ?</h1>
                <small>Provide the code sent to your mail</small>

                <form onSubmit={handleSubmit}>
                  <div className="form_group">
                    <label htmlFor="code">Enter code</label>
                    <input
                      name="code"
                      type="text"
                      placeholder="5434"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.code && touched.code && (
                      <div className="input_feedback">{errors.code}</div>
                    )}
                  </div>

                  <div className="form_group">
                    <label htmlFor="password">New Password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={values.password}
                      autoComplete="on"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
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

                  <div className="form_group">
                    <label htmlFor="password">Confirm Password</label>
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

                  <div className="form_group">
                    <button type="submit" disabled={isSubmitting}>
                      {alert.authloading === true ? (
                        <Loading width="25px" height="25px" color="#fff" />
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
