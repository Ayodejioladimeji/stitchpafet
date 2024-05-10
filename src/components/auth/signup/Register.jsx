import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import PhoneInput from "react-phone-number-input";

// COMPONENTS
import Loading from "../../../common/Loading";
import { register } from "../../../redux/actions/authAction";
import SEO from "./../../../common/SEO";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

const Register = () => {
  const { alert, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const history = useHistory();

  // const [typePass, setTypePass] = useState(false);
  // const [typePassword, setTypePassword] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    if (auth.token.token) {
      history.push("/");
    }
  }, [auth.token.token, history]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        password2: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;

        const newData = {
          email: email.toLowerCase(),
          phone: phoneNumber?.toString(),
          password: password,
        };

        setTimeout(async () => {
          if (!phoneNumber) {
            setPhoneError("Phone number is required");
          } else {
            dispatch(register(newData));
          }

          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

        // EMAIL SECTION
        if (!values.email) {
          errors.email = "Email is Required";
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = "Invalid email address";
        }

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

        const changePhoneNumber = (e) => {
          setPhoneNumber(e);
        };

        return (
          <div className="register">
            <SEO title="Create Account" />
            <div className="register-left">
              <div className="register-top">
                <img src="/assets/new-logo-lights.png" alt="" />

                <h2>Enjoy secure and fraud-free transactions </h2>
                <Link to="/">
                  <button>Go Home</button>
                </Link>
              </div>
              {/* <LazyLoadImage alt='' src='/assets/reg.jpg' /> */}
            </div>

            <div id="overflow" className="register-right">
              <div className="register-form">
                <h1>Signup to continue</h1>
                <small>
                  To become a seller click
                  <Link to="/register-vendor"> here</Link>
                </small>

                <form onSubmit={handleSubmit}>
                  <div className="form_group">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      type="text"
                      placeholder="bright@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // className={errors.email && touched.email && 'error'}
                    />
                    {errors.email && touched.email && (
                      <div className="input_feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form_group">
                    <label htmlFor="phone">Phone number</label>

                    <div id="input">
                      <PhoneInput
                        name="phoneNumber"
                        placeholder="08053838074"
                        defaultCountry="NG"
                        value={phoneNumber}
                        onChange={changePhoneNumber}
                        className="phoneinput"
                        onBlur={handleBlur}
                      />
                    </div>
                    {!phoneNumber ? (
                      <div className="input_feedback">{phoneError}</div>
                    ) : !phoneNumber && !touched.phoneNumber ? (
                      <div className="input_feedback">{phoneError}</div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_group">
                    <label htmlFor="password">Password</label>
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
                    {/* {!errors.password && !touched.password && (
                      <div className='input_feed'>
                        Password must be 8 characters long, one Uppercase,one
                        Number, one Character
                      </div>
                    )} */}
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
                        "Create an account"
                      )}
                    </button>
                  </div>

                  <small className="text-center">
                    Already a customer? <Link to="/auth/login">Login</Link>
                  </small>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
