/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from "amazon-cognito-identity-js";
import config from "../../../config";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
const poolData = {
  UserPoolId: config.awsConfig.UserPoolId,
  ClientId: config.awsConfig.ClientId,
};

const userPool = new CognitoUserPool(poolData);

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorAPI, setPasswordErrorAPI] = useState(false);
  const [emailErrorAPI, setEmailErrorAPI] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const handleChange = (prop, event) => {
    if (prop === "checkTerms") {
      setValues({ ...values, [prop]: event.target.checked });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  useEffect(() => {}, [emailErrorAPI]);

  const handleSignUp = () => {
    console.log(values);
    setLoading(true);
    let validationArr = [];

    if (values.email) {
      validationArr.push(false);
      setMailError(false);
    } else {
      validationArr.push(true);
      setMailError(true);
    }

    if (values.password) {
      validationArr.push(false);
      setPasswordError(false);
    } else {
      validationArr.push(true);
      setPasswordError(true);
    }

    if (!validationArr.includes(true)) {
      userPool.signUp(values.email, values.password, null, null, (err, data) => {
        if (data && data.user && data.userSub) {
          // setAlert(true);
          // setTimeout(() => {
          // props.history.push("/confirm");
          navigate("/authentication/confirm", { state: { email: values.email } });
          // }, 1000);
        }
        console.log("err.message");
        console.log(err);
        console.log(err.message);
        if (err && err.message != 400) {
          if (err.message.includes("Password must have numeric characters")) {
            setPasswordErrorAPI(true);
            setErrorPasswordMessage("Password must have numeric characters");
          } else if (err.message.includes("Password must have uppercase characters")) {
            console.log("Password must have uppercase characters true");
            setPasswordErrorAPI(true);
            setErrorPasswordMessage("Password must have uppercase characters");
          } else if (err.message.includes("Password must have lowercase characters")) {
            setPasswordErrorAPI(true);
            setErrorPasswordMessage("Password must have lowercase characters");
          } else if (err.message.includes("Password must have symbol characters")) {
            setPasswordErrorAPI(true);
            setErrorPasswordMessage("Password must have symbol/special characters");
          } else if (err.message.includes("Password not long enough")) {
            setPasswordErrorAPI(true);
            setErrorPasswordMessage("Password not long enough");
          } else {
            setPasswordErrorAPI(false);
          }

          if (err.message.includes("Provide valid Email ID")) {
            setEmailErrorAPI(true);
            setErrorPasswordMessage("Username should be an email");
          } else if (err.message.includes("An account with the given email already exists")) {
            setPasswordErrorAPI(true);
            setErrorPasswordMessage("Email already exists");
          } else {
            setEmailErrorAPI(false);
          }
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <IllustrationLayout title="Sign Up" description="Enter your details for sign up">
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card style={{ paddingTop: "0px" }}>
        {/* <ArgonBox mb={2}>
          <Socials />
        </ArgonBox> */}
        {/* <ArgonBox px={12}>
          <Separator />
        </ArgonBox> */}
        <ArgonBox pb={3} px={3}>
          {console.log("passwordErrorAPI    " + passwordErrorAPI)}
          <p style={{ fontSize: "12", color: "red" }}>
            {passwordErrorAPI ? errorPasswordMessage : ""}
          </p>
          <p style={{ fontSize: "12", color: "red" }}>
            {emailErrorAPI ? errorPasswordMessage : ""}
          </p>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                error={mailError}
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  handleChange("email", event);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                error={passwordError}
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  handleChange("password", event);
                }}
              />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => {
                  console.log("handleSignUp call");
                  handleSignUp();
                }}
              >
                sign up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </IllustrationLayout>
  );
}

export default Cover;
