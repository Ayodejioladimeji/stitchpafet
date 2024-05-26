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
import { PostRequest } from "@/utils/request";
import cogoToast from "cogo-toast";

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


  // handle submit
  const handleSubmit = async (payload) => {
    const res = await PostRequest("/auth/register", payload)

    if (res?.status === 200) {
      cogoToast.success(res.data.msg)
      router.push('/auth/login')
    }
  }

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { name, email, password } = values;

        const newData = {
          name: name.toLowerCase(),
          email: email.toLowerCase(),
          password: password,
        };

        handleSubmit(newData)

        setTimeout(async () => {
          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors: any = {};

        // NAME SECTION
        if (!values.name) {
          errors.name = "Your name is Required";
        }

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
                    <label htmlFor="email">FullName</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Yemi Alonso"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <div className="input_feedback">{errors.name}</div>
                    )}
                  </div>

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
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
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
