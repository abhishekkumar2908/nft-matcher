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

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// react-router-dom components
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { useNavigate } from "react-router-dom";
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from "amazon-cognito-identity-js";
// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import config from "../../../config";
import { Backdrop, CircularProgress } from "@material-ui/core";

const poolData = {
  UserPoolId: config.awsConfig.UserPoolId,
  ClientId: config.awsConfig.ClientId,
};
const UserPool = new CognitoUserPool(poolData);

function resetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [mailError, setMailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  useEffect(() => {
    if (location.state) {
      setLoading(true);
      const tenant = location.state;
      console.log("tenant tenant tenant  ==========");
      console.log(tenant);

      setValues(tenant);
      setLoading(false);
    }
  }, [location.state]);

  const handleChange = (prop, event) => {
    if (prop === "checkTerms") {
      setValues({ ...values, [prop]: event.target.checked });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const onSubmit = () => {
    setLoading(true);
    let validationArr = [];

    if (values.password) {
      validationArr.push(false);
      setMailError(false);
    } else {
      validationArr.push(true);
      setMailError(true);
    }

    if (values.code) {
      validationArr.push(false);
      setCodeError(false);
    } else {
      validationArr.push(true);
      setCodeError(true);
    }

    const user = new CognitoUser({
      Username: values.email,
      Pool: UserPool,
    });

    if (!validationArr.includes(true)) {
      console.log(values.code + " " + values.password);
      user.confirmPassword(values.code, values.password, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          setOpenExport(true);
          setTimeout(() => {
            navigate("/authentication/sign-in");
          }, 3000);
        },

        onFailure: (err) => {
          console.log("err");
          console.log(err);
          if (err.message.includes("Incorrect username or password.")) {
            setLoginError(true);
            setLoginErrorMsg("Incorrect username or password");
          } else if (err.message.includes("User is disabled")) {
            setLoginError(true);
            setLoginErrorMsg("User is disabled");
          } else if (err.message.includes("User is not confirmed.")) {
            setLoginError(true);
            setLoginErrorMsg("User is not confirmed please Confirm your email and login again");
          } else if (err.message.includes("Password must have numeric characters")) {
            setLoginError(true);
            setLoginErrorMsg("Password must have numeric characters");
          } else if (err.message.includes("Password must have symbol characters")) {
            setLoginError(true);
            setLoginErrorMsg("Password must have symbol characters");
          } else if (err.message.includes("Password must have uppercase characters")) {
            setLoginError(true);
            setLoginErrorMsg("Password must have uppercase characters");
          } else {
            setLoginError(false);
          }

          // Password must have uppercase characters
          setLoading(false);
        },
      });
    } else {
      setLoading(false);
    }
  };

  const handleExportClose = async () => {
    setOpenExport(false);
  };

  return (
    <IllustrationLayout
      title="Forgot Password"
      description="Enter email that you want to forgot password"
    >
      <Backdrop open={loading} style={{ zIndex: 999, color: "#fff" }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <p style={{ fontSize: "12px", color: "red" }}>{loginError ? loginErrorMsg : ""}</p>
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput
            error={mailError}
            type="text"
            placeholder="Code"
            size="large"
            onChange={(event) => {
              handleChange("code", event);
            }}
          />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput
            error={mailError}
            type="password"
            placeholder="New Password"
            size="large"
            onChange={(event) => {
              handleChange("password", event);
            }}
          />
        </ArgonBox>

        <ArgonBox mt={4} mb={1}>
          <ArgonButton
            color="info"
            size="large"
            fullWidth
            onClick={() => {
              console.log("Button Clicked");
              onSubmit();
            }}
          >
            Forgot password
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <ArgonTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign in
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
        <Snackbar open={openExport} autoHideDuration={6000} onClose={handleExportClose}>
          <Alert onClose={handleExportClose} severity="success" sx={{ width: "100%" }}>
            Password Reset Succesfully please login.
          </Alert>
        </Snackbar>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default resetPassword;
