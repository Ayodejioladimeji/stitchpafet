import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Loading from "../../../common/Loading";
import { forgotPassword } from "../../../redux/actions/authAction";
//
import SEO from "./../../../common/SEO";

// VALIDATION REGEX

const ForgotPassword = () => {
  const { alert } = useSelector((state) => state);

  const dispatch = useDispatch();

  //

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          dispatch(forgotPassword(values));

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
            <SEO title="Forgot Password" />
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
                <h1>Forgot your Password ?</h1>
                <small>Provide your email below</small>

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
                    />
                    {errors.email && touched.email && (
                      <div className="input_feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form_group">
                    <button type="submit" disabled={isSubmitting}>
                      {alert.authloading === true ? (
                        <Loading width="25px" height="25px" color="#fff" />
                      ) : (
                        "Get Code"
                      )}
                    </button>
                  </div>

                  <small className="text-center">
                    Remember your password ? <Link to="/auth/login">Login</Link>
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

export default ForgotPassword;
