import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Loading from "../../common/Loading";
import Link from "next/link";
import { CgArrowLongLeft } from "react-icons/cg";
import { useRouter } from "next/router";

// VALIDATION REGEX

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

            </div>

            <div id="overflow" className="login-right">
              <div className="login-form">

                <div onClick={() => router.push("/")}>
                  <CgArrowLongLeft className="back-icon" />
                </div>

                <h1>Welcome back!</h1>

                <small>
                  Stay trendy, Stay you.
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

                    <Link href="/auth/forgot-password">
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
                      {loading ? (
                        <Loading width="25px" height="25px" color="#fff" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>

                  <small className="text-center">
                    Not a customer? <Link href="/auth/register">register</Link>
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
