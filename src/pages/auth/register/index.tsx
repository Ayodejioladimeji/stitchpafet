import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import PhoneInput from "react-phone-number-input";

// COMPONENTS
import Loading from "../../../common/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Goback from "@/common/goback/Goback";
import { CgArrowLongLeft } from "react-icons/cg";

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

const Register = () => {
  const { alert, auth } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter();

  // const [typePass, setTypePass] = useState(false);
  // const [typePassword, setTypePassword] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    if (auth.token.token) {
      router.push("/");
    }
  }, [auth.token.token]);

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
            // dispatch(register(newData));
          }

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
            {/* <SEO title="Create Account" /> */}
            <div className="register-left">
              <div className="register-top">

              </div>
            </div>

            <div id="overflow" className="register-right">
              <div className="register-form">
                <div onClick={() => router.push("/")}>
                  <CgArrowLongLeft className="back-icon" />
                </div>

                <h1>Signup to continue</h1>
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
                    Already a customer? <Link href="/auth/login">Login</Link>
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