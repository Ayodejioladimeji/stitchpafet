import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Loading from "../../../common/Loading";
import { login } from "../../../redux/actions/authAction";
import SEO from "../../../common/SEO";
import Link from "next/link";

// VALIDATION REGEX

const Login = () => {
  const { loading } = useSelector((state: any) => state)

  //

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          // dispatch(
          //   login(values, history, redirect_route, datacart, cartcallback)
          // );

          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = null;

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
            {/* <SEO title="Login" /> */}
            <div className="login-left">
              <div className="login-top">
                <img src="/assets/new-logo-lights.png" alt="" />

                <h2>Fast and stress-free Escrow system</h2>
                <Link href="/">
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
                  <Link href="/register-vendor"> here</Link>
                </small>


              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
