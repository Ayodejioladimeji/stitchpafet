import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import { useHistory } from "react-router-dom";

// COMPONENTS
import Loading from "../../../common/Loading";
import { login } from "../../../redux/actions/authAction";
import SEO from "./../../../common/SEO";

// VALIDATION REGEX

const Login = () => {
  const { alert, auth } = useSelector((state) => state);
  const { cartcallback } = useSelector((state) => state.product);
  const { redirect_route, datacart } = auth;
  const dispatch = useDispatch();
  const history = useHistory();

  //

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          dispatch(
            login(values, history, redirect_route, datacart, cartcallback)
          );

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
            <SEO title="Login" />
            <div className="login-left">
              <div className="login-top">
                <img src="/assets/new-logo-lights.png" alt="" />

                <h2>Fast and stress-free Escrow system</h2>
                <Link to="/">
                  <button>Go Home</button>
                </Link>
              </div>
              {/* <LazyLoadImage alt='' src='/assets/login.webp' /> */}
            </div>

            <div id="overflow" className="login-right">
              <div className="login-form">
                <h1>Login to continue</h1>
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
                    {errors.password && touched.password && (
                      <div className="input_feedback">{errors.password}</div>
                    )}

                    <Link to="/auth/forgot-password">
                      <div className="password-forgot">forgot password?</div>
                    </Link>
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
                    <button type="submit" disabled={isSubmitting}>
                      {alert.authloading === true ? (
                        <Loading width="25px" height="25px" color="#fff" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  <small className="text-center">
                    Not a customer? <Link to="/auth/register">register</Link>
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

export default Login;
